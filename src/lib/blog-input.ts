type AllowedImageType =
  | "image/avif"
  | "image/gif"
  | "image/jpeg"
  | "image/png"
  | "image/webp";

export type BlogPostInput = {
  title: string;
  slug: string;
  summary: string;
  content: string;
  tags: string[];
  category: string;
  image: {
    bytes: Buffer;
    mimeType: AllowedImageType;
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

function detectMimeType(bytes: Buffer): AllowedImageType | null {
  if (bytes.subarray(0, 3).equals(Buffer.from([0xff, 0xd8, 0xff]))) return "image/jpeg";
  if (bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "image/png";
  if (["GIF87a", "GIF89a"].includes(bytes.subarray(0, 6).toString("ascii"))) return "image/gif";
  if (bytes.subarray(0, 4).toString("ascii") === "RIFF" && bytes.subarray(8, 12).toString("ascii") === "WEBP") return "image/webp";
  if (bytes.subarray(4, 12).toString("ascii").startsWith("ftypavi")) return "image/avif";
  return null;
}

function readImage(payload: Record<string, unknown>, title: string) {
  const value = payload.image ?? payload.Image ?? payload.imageBase64;
  if (value === undefined || value === null || value === "") return null;

  let base64: unknown = value;
  let declaredMimeType: unknown = payload.imageMimeType;
  let alt: unknown = payload.imageAlt;

  if (typeof value === "object" && !Array.isArray(value)) {
    const image = value as Record<string, unknown>;
    base64 = image.base64;
    declaredMimeType = image.mimeType ?? declaredMimeType;
    alt = image.alt ?? alt;
  }

  if (typeof base64 !== "string") {
    throw new BlogInputError("image.base64 must be a string.");
  }

  let encodedImage = base64;
  const dataUrl = encodedImage.match(
    /^data:(image\/[a-z0-9.+-]+);base64,([\s\S]+)$/i,
  );
  if (dataUrl) {
    declaredMimeType = dataUrl[1].toLowerCase();
    encodedImage = dataUrl[2];
  }

  const normalizedBase64 = encodedImage.replace(/\s/g, "");
  if (!normalizedBase64 || !/^[a-z0-9+/]+={0,2}$/i.test(normalizedBase64)) {
    throw new BlogInputError("image contains invalid Base64 data.");
  }

  const bytes = Buffer.from(normalizedBase64, "base64");
  if (bytes.length === 0 || bytes.length > 10 * 1024 * 1024) {
    throw new BlogInputError("image must have at most 10 MB.");
  }

  const detectedMimeType = detectMimeType(bytes);
  if (!detectedMimeType) {
    throw new BlogInputError("image format is not supported.");
  }
  if (declaredMimeType && declaredMimeType !== detectedMimeType) {
    throw new BlogInputError("image MIME type does not match its contents.");
  }

  return {
    bytes,
    mimeType: detectedMimeType,
    alt: optionalString(alt, "imageAlt") ?? title,
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
