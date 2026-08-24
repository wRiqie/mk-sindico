import { CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { BlogPostSummary } from "@/lib/blog";

const dateFormatter = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "long", year: "numeric", timeZone: "America/Sao_Paulo" });

export function formatBlogDate(date: string) {
  return dateFormatter.format(new Date(date));
}

export function BlogCard({ post, related = false }: { post: BlogPostSummary; related?: boolean }) {
  return (
    <article className={related ? "post-related-card" : "blog-card"}>
      <Link className="blog-card-link" href={`/blog/${post.slug}`}>
        <div className="blog-card-image">
          {post.coverImageUrl ? <Image src={post.coverImageUrl} alt={post.coverImageAlt ?? ""} fill sizes={related ? "(max-width: 760px) 38vw, 340px" : "(max-width: 650px) 100vw, (max-width: 950px) 50vw, 33vw"} /> : <span aria-hidden="true">MK</span>}
        </div>
        <div className={related ? undefined : "blog-card-copy"}>
          <span className="blog-tag">{post.category}</span>
          {related ? <h3>{post.title}</h3> : <h2>{post.title}</h2>}
          {!related && <p>{post.excerpt}</p>}
          <div className="blog-meta">
            <span><CalendarDays size={related ? 13 : 14} />{formatBlogDate(post.publishedAt)}</span>
            {!related && <span>{post.author}</span>}
          </div>
        </div>
      </Link>
    </article>
  );
}

