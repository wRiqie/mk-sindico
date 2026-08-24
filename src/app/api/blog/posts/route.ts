import { timingSafeEqual } from "node:crypto";
import {
  apiError,
  BLOG_POST_SUMMARY_COLUMNS,
  BlogPostRow,
  normalizeCategorySlug,
  sanitizeBlogHtml,
  toBlogPostDetail,
  toBlogPostSummary,
} from "@/lib/blog";
import { BlogInputError, parseBlogPostInput } from "@/lib/blog-input";
import {
  getSupabaseAdminClient,
  getSupabaseServerClient,
} from "@/lib/supabase/server";

export const runtime = "nodejs";

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

function hasValidApiKey(request: Request) {
  const expectedKey = process.env.N8N_BLOG_API_KEY;
  const authorization = request.headers.get("authorization");

  if (!expectedKey || !authorization?.startsWith("Bearer ")) {
    return false;
  }

  const receivedKey = authorization.slice("Bearer ".length);
  const expectedBuffer = Buffer.from(expectedKey);
  const receivedBuffer = Buffer.from(receivedKey);

  return (
    expectedBuffer.length === receivedBuffer.length &&
    timingSafeEqual(expectedBuffer, receivedBuffer)
  );
}

export async function PUT(request: Request) {
  if (!process.env.N8N_BLOG_API_KEY) {
    console.error("N8N_BLOG_API_KEY is not configured");
    return apiError(500, "BLOG_API_NOT_CONFIGURED", "Blog API is not configured.");
  }

  if (!hasValidApiKey(request)) {
    return apiError(401, "UNAUTHORIZED", "A valid API key is required.");
  }

  try {
    const body = await request.json();
    const input = parseBlogPostInput(body);
    const contentHtml = sanitizeBlogHtml(input.content);

    if (!contentHtml.trim()) {
      return apiError(400, "INVALID_CONTENT", "content has no allowed HTML.");
    }

    const supabase = getSupabaseAdminClient();
    const { data: existingPost, error: existingPostError } = await supabase
      .from("blog_posts")
      .select("id")
      .eq("slug", input.slug)
      .maybeSingle();

    if (existingPostError) {
      console.error("Failed to check existing blog post", existingPostError);
      return apiError(500, "BLOG_QUERY_FAILED", "Unable to save blog post.");
    }

    let coverImageUrl: string | undefined;
    let coverImageAlt: string | undefined;

    if (input.image) {
      const imagePath = `${input.slug}/cover`;
      const { error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(imagePath, input.image.bytes, {
          contentType: input.image.mimeType,
          cacheControl: "31536000",
          upsert: true,
        });

      if (uploadError) {
        console.error("Failed to upload blog cover image", uploadError);
        return apiError(500, "IMAGE_UPLOAD_FAILED", "Unable to upload cover image.");
      }

      const { data: publicImage } = supabase.storage
        .from("blog-images")
        .getPublicUrl(imagePath);
      coverImageUrl = `${publicImage.publicUrl}?v=${Date.now()}`;
      coverImageAlt = input.image.alt;
    }

    const postPayload: Record<string, unknown> = {
      title: input.title,
      slug: input.slug,
      excerpt: input.summary,
      content_html: contentHtml,
      tags: input.tags,
      category: input.category,
      author: input.author,
      status: input.status,
      seo_title: input.seoTitle,
      seo_description: input.seoDescription,
    };

    if (input.publishedAt !== undefined) {
      postPayload.published_at = input.publishedAt;
    }
    if (coverImageUrl) {
      postPayload.cover_image_url = coverImageUrl;
      postPayload.cover_image_alt = coverImageAlt;
    }

    const { data, error } = await supabase
      .from("blog_posts")
      .upsert(postPayload as never, { onConflict: "slug" })
      .select("*")
      .single();

    if (error) {
      console.error("Failed to upsert blog post", error);
      return apiError(500, "BLOG_WRITE_FAILED", "Unable to save blog post.");
    }

    return Response.json(
      {
        post: toBlogPostDetail(data as unknown as BlogPostRow),
        created: !existingPost,
      },
      { status: existingPost ? 200 : 201 },
    );
  } catch (error) {
    if (error instanceof BlogInputError) {
      return apiError(400, "INVALID_POST", error.message);
    }
    if (error instanceof SyntaxError) {
      return apiError(400, "INVALID_JSON", "Request body must contain valid JSON.");
    }

    console.error("Failed to receive blog post", error);
    return apiError(500, "BLOG_UNAVAILABLE", "Blog service is unavailable.");
  }
}
