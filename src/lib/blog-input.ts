export type BlogPostInput = {
  title: string;
  slug: string;
  summary: string;
  content: string;
  tags: string[];
  category: string;
  image: {
    bytes: Buffer;
    mimeType: "image/png";
    alt: string;
  } | null;
  author: string;
  status: "draft" | "published" | "archived";
  publishedAt?: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
};

export class BlogInputError extends Error {}

function requiredString(value: unknown, field: string) {
  if (typeof value !== "string" || !value.trim()) {
    throw new BlogInputError(`${field} is required.`);
  }
  return value.trim();
}

function optionalString(value: unknown, field: string) {
  if (value === undefined || value === null || value === "") return null;
  if (typeof value !== "string") {
    throw new BlogInputError(`${field} must be a string.`);
  }
  return value.trim() || null;
}

function readTags(value: unknown) {
  const tags = Array.isArray(value)
    ? value
    : typeof value === "string"
      ? value.split(/[|,]/)
      : null;

  if (!tags || tags.some((tag) => typeof tag !== "string")) {
    throw new BlogInputError("tags must be an array or a comma/pipe-separated string.");
  }

  return [...new Set(tags.map((tag) => tag.trim()).filter(Boolean))];
}

function readImage(payload: Record<string, unknown>, title: string) {
  const value = payload.image;
  if (value === undefined || value === null || value === "") return null;

  if (typeof value !== "string") {
    throw new BlogInputError("image must be a Base64 string.");
  }

  let encodedImage = value;
  const dataUrl = encodedImage.match(/^data:image\/png;base64,([\s\S]+)$/i);
  if (dataUrl) {
    encodedImage = dataUrl[1];
  }

  const normalizedBase64 = encodedImage.replace(/\s/g, "");
  if (!normalizedBase64 || !/^[a-z0-9+/]+={0,2}$/i.test(normalizedBase64)) {
    throw new BlogInputError("image contains invalid Base64 data.");
  }

  const bytes = Buffer.from(normalizedBase64, "base64");
  if (bytes.length === 0 || bytes.length > 10 * 1024 * 1024) {
    throw new BlogInputError("image must have at most 10 MB.");
  }

  const pngSignature = Buffer.from([
    0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
  ]);
  if (!bytes.subarray(0, 8).equals(pngSignature)) {
    throw new BlogInputError("image must contain a valid PNG file.");
  }

  return {
    bytes,
    mimeType: "image/png" as const,
    alt: title,
  };
}

export function parseBlogPostInput(value: unknown): BlogPostInput {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new BlogInputError("Request body must be a JSON object.");
  }

  const payload = value as Record<string, unknown>;
  const title = requiredString(payload.title, "title");
  const slug = requiredString(payload.slug, "slug").toLowerCase();
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new BlogInputError("slug must contain only lowercase letters, numbers and hyphens.");
  }

  const status = payload.status ?? "published";
  if (!(["draft", "published", "archived"] as unknown[]).includes(status)) {
    throw new BlogInputError("status must be draft, published or archived.");
  }

  let publishedAt: string | null | undefined;
  if (payload.publishedAt !== undefined) {
    publishedAt = optionalString(payload.publishedAt, "publishedAt");
    if (publishedAt && Number.isNaN(Date.parse(publishedAt))) {
      throw new BlogInputError("publishedAt must be a valid ISO date.");
    }
  }

  return {
    title,
    slug,
    summary: requiredString(payload.summary, "summary"),
    content: requiredString(payload.content, "content"),
    tags: readTags(payload.tags),
    category: requiredString(payload.category, "category"),
    image: readImage(payload, title),
    author: optionalString(payload.author, "author") ?? "Marcos Kowalewski",
    status: status as BlogPostInput["status"],
    publishedAt,
    seoTitle: optionalString(payload.seoTitle, "seoTitle"),
    seoDescription: optionalString(payload.seoDescription, "seoDescription"),
  };
}
