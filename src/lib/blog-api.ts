import { cache } from "react";
import type { BlogPostDetail, BlogPostSummary } from "@/lib/blog";
import { getSiteUrl } from "@/lib/site-url";

export type BlogCategory = {
  name: string;
  slug: string;
};

export type BlogListResponse = {
  posts: BlogPostSummary[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
  filter: {
    category: string | null;
  };
  categories: BlogCategory[];
};

export type BlogDetailResponse = {
  post: BlogPostDetail;
  relatedPosts: BlogPostSummary[];
};

export class BlogApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

async function requestBlogApi<T>(path: string): Promise<T> {
  const response = await fetch(`${getSiteUrl()}${path}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new BlogApiError(response.status, `Blog API returned ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function getBlogPosts(page: number, limit: number, category?: string) {
  const searchParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (category) {
    searchParams.set("category", category);
  }

  return requestBlogApi<BlogListResponse>(
    `/api/blog/posts?${searchParams.toString()}`,
  );
}

export const getBlogPost = cache((slug: string) =>
  requestBlogApi<BlogDetailResponse>(`/api/blog/posts/${encodeURIComponent(slug)}`),
);

