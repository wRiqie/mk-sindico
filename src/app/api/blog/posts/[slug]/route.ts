import {
  apiError,
  BLOG_POST_DETAIL_COLUMNS,
  BLOG_POST_SUMMARY_COLUMNS,
  BlogPostRow,
  toBlogPostDetail,
  toBlogPostSummary,
} from "@/lib/blog";
import { getSupabaseServerClient } from "@/lib/supabase/server";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;

  if (!SLUG_PATTERN.test(slug)) {
    return apiError(400, "INVALID_SLUG", "slug is invalid.");
  }

  try {
    const supabase = getSupabaseServerClient();
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from("blog_posts")
      .select(BLOG_POST_DETAIL_COLUMNS)
      .eq("slug", slug)
      .eq("status", "published")
      .lte("published_at", now)
      .maybeSingle();

    if (error) {
      console.error("Failed to load blog post", error);
      return apiError(500, "BLOG_QUERY_FAILED", "Unable to load blog post.");
    }

    if (!data) {
      return apiError(404, "POST_NOT_FOUND", "Blog post not found.");
    }

    const post = data as unknown as BlogPostRow;
    const relatedBaseQuery = () =>
      supabase
        .from("blog_posts")
        .select(BLOG_POST_SUMMARY_COLUMNS)
        .eq("status", "published")
        .lte("published_at", now)
        .neq("id", post.id)
        .order("published_at", { ascending: false })
        .limit(3);

    const [sameCategoryResult, recentResult] = await Promise.all([
      relatedBaseQuery().eq("category_slug", post.category_slug),
      relatedBaseQuery(),
    ]);

    if (sameCategoryResult.error || recentResult.error) {
      console.error(
        "Failed to load related blog posts",
        sameCategoryResult.error ?? recentResult.error,
      );
      return apiError(
        500,
        "RELATED_POSTS_QUERY_FAILED",
        "Unable to load related blog posts.",
      );
    }

    const relatedRows = [
      ...((sameCategoryResult.data ?? []) as unknown as BlogPostRow[]),
      ...((recentResult.data ?? []) as unknown as BlogPostRow[]),
    ];
    const uniqueRelatedPosts = Array.from(
      new Map(relatedRows.map((relatedPost) => [relatedPost.id, relatedPost])).values(),
    ).slice(0, 3);

    return Response.json({
      post: toBlogPostDetail(post),
      relatedPosts: uniqueRelatedPosts.map(toBlogPostSummary),
    });
  } catch (error) {
    console.error("Failed to initialize blog post detail", error);
    return apiError(500, "BLOG_UNAVAILABLE", "Blog service is unavailable.");
  }
}

