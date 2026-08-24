import {
  apiError,
  BLOG_POST_SUMMARY_COLUMNS,
  BlogPostRow,
  normalizeCategorySlug,
  toBlogPostSummary,
} from "@/lib/blog";
import { getSupabaseServerClient } from "@/lib/supabase/server";

const DEFAULT_PAGE_SIZE = 10;
const MAX_PAGE_SIZE = 50;

function readPositiveInteger(
  value: string | null,
  fallback: number,
  maximum?: number,
) {
  if (value === null) {
    return fallback;
  }

  if (!/^\d+$/.test(value)) {
    return null;
  }

  const parsed = Number(value);

  if (!Number.isSafeInteger(parsed) || parsed < 1) {
    return null;
  }

  return maximum ? Math.min(parsed, maximum) : parsed;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = readPositiveInteger(searchParams.get("page"), 1);
  const limit = readPositiveInteger(
    searchParams.get("limit"),
    DEFAULT_PAGE_SIZE,
    MAX_PAGE_SIZE,
  );

  if (page === null || limit === null) {
    return apiError(
      400,
      "INVALID_PAGINATION",
      "page and limit must be positive integers.",
    );
  }

  const category = searchParams.get("category")?.trim() ?? "";

  if (category.length > 100) {
    return apiError(
      400,
      "INVALID_CATEGORY",
      "category must have at most 100 characters.",
    );
  }

  const categorySlug = category ? normalizeCategorySlug(category) : "";

  if (category && !categorySlug) {
    return apiError(400, "INVALID_CATEGORY", "category is invalid.");
  }

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  try {
    const supabase = getSupabaseServerClient();
    let query = supabase
      .from("blog_posts")
      .select(BLOG_POST_SUMMARY_COLUMNS, { count: "exact" })
      .eq("status", "published")
      .lte("published_at", new Date().toISOString())
      .order("published_at", { ascending: false })
      .range(from, to);

    if (categorySlug) {
      query = query.eq("category_slug", categorySlug);
    }

    const [postsResult, categoriesResult] = await Promise.all([
      query,
      supabase
        .from("blog_posts")
        .select("category,category_slug")
        .eq("status", "published")
        .lte("published_at", new Date().toISOString())
        .order("category", { ascending: true })
        .limit(1000),
    ]);

    const { data, error, count } = postsResult;

    if (error || categoriesResult.error) {
      console.error(
        "Failed to list blog posts",
        error ?? categoriesResult.error,
      );
      return apiError(500, "BLOG_QUERY_FAILED", "Unable to load blog posts.");
    }

    const total = count ?? 0;
    const totalPages = Math.ceil(total / limit);

    return Response.json({
      posts: ((data ?? []) as unknown as BlogPostRow[]).map(
        toBlogPostSummary,
      ),
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasPreviousPage: page > 1,
        hasNextPage: page < totalPages,
      },
      filter: {
        category: categorySlug || null,
      },
      categories: Array.from(
        new Map(
          ((categoriesResult.data ?? []) as unknown as Array<{
            category: string;
            category_slug: string;
          }>).map((item) => [
            item.category_slug,
            {
              name: item.category,
              slug: item.category_slug,
            },
          ]),
        ).values(),
      ),
    });
  } catch (error) {
    console.error("Failed to initialize blog post listing", error);
    return apiError(500, "BLOG_UNAVAILABLE", "Blog service is unavailable.");
  }
}
