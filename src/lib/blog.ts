import sanitizeHtml from "sanitize-html";

export const BLOG_POST_SUMMARY_COLUMNS = [
  "id",
  "title",
  "slug",
  "excerpt",
  "category",
  "category_slug",
  "cover_image_url",
  "cover_image_alt",
  "author",
  "published_at",
  "seo_title",
  "seo_description",
  "created_at",
  "updated_at",
].join(",");

export const BLOG_POST_DETAIL_COLUMNS = [
  BLOG_POST_SUMMARY_COLUMNS,
  "content_html",
].join(",");

export type BlogPostRow = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content_html?: string;
  category: string;
  category_slug: string;
  cover_image_url: string | null;
  cover_image_alt: string | null;
  author: string;
  published_at: string;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
};

export type BlogPostSummary = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  coverImageUrl: string | null;
  coverImageAlt: string | null;
  author: string;
  publishedAt: string;
  seoTitle: string | null;
  seoDescription: string | null;
  createdAt: string;
  updatedAt: string;
};

export type BlogPostDetail = BlogPostSummary & {
  contentHtml: string;
};

export function toBlogPostSummary(row: BlogPostRow): BlogPostSummary {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    category: row.category,
    categorySlug: row.category_slug,
    coverImageUrl: row.cover_image_url,
    coverImageAlt: row.cover_image_alt,
    author: row.author,
    publishedAt: row.published_at,
    seoTitle: row.seo_title,
    seoDescription: row.seo_description,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function toBlogPostDetail(row: BlogPostRow): BlogPostDetail {
  return {
    ...toBlogPostSummary(row),
    contentHtml: sanitizeBlogHtml(row.content_html ?? ""),
  };
}

function sanitizeBlogHtml(html: string) {
  return sanitizeHtml(html, {
    allowedTags: [
      "p",
      "h2",
      "h3",
      "h4",
      "ul",
      "ol",
      "li",
      "strong",
      "em",
      "u",
      "blockquote",
      "a",
      "figure",
      "figcaption",
      "img",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
      "hr",
      "br",
      "code",
      "pre",
    ],
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "title", "width", "height", "loading"],
      th: ["scope", "colspan", "rowspan"],
      td: ["colspan", "rowspan"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesByTag: {
      img: ["http", "https"],
    },
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", {
        rel: "noopener noreferrer",
      }),
      img: sanitizeHtml.simpleTransform("img", {
        loading: "lazy",
      }),
    },
  });
}

export function normalizeCategorySlug(category: string) {
  return category
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function apiError(status: number, code: string, message: string) {
  return Response.json(
    {
      error: {
        code,
        message,
      },
    },
    { status },
  );
}
