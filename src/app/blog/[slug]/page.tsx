import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Clock3, MessageCircle } from "lucide-react";
import { BlogCard, formatBlogDate } from "@/app/blog/_components/blog-card";
import { BlogFooter, BlogHeader } from "@/app/blog/_components/blog-chrome";
import { BlogApiError, getBlogPost } from "@/lib/blog-api";
import { getSiteUrl } from "@/lib/site-url";

export const dynamic = "force-dynamic";

function readingTime(html: string) {
  const words = html.replace(/<[^>]*>/g, " ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}
async function loadPost(slug: string) {
  try {
    return await getBlogPost(slug);
  } catch (error) {
    if (error instanceof BlogApiError && error.status === 404) notFound();
    throw error;
  }
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const { post } = await loadPost(slug);
  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;

  return {
    title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: post.coverImageUrl ? [{ url: post.coverImageUrl, alt: post.coverImageAlt ?? post.title }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const { post, relatedPosts } = await loadPost(slug);
  const minutes = readingTime(post.contentHtml);
  const postUrl = `${getSiteUrl()}/blog/${post.slug}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${post.title} ${postUrl}`)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`;

  return (
    <main className="blog-page post-page">
      <BlogHeader />
      <article>
        <header className="post-hero"><div className="wrap post-hero-inner">
          <div className="blog-breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/blog">Blog</Link><span>›</span><span>{post.category}</span></div>
          <span className="post-category">{post.category}</span>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
          <div className="post-meta"><span><CalendarDays size={15} />{formatBlogDate(post.publishedAt)}</span><span><Clock3 size={15} />{minutes} min de leitura</span></div>
        </div></header>

        {post.coverImageUrl ? <div className="post-cover post-cover-image"><Image src={post.coverImageUrl} alt={post.coverImageAlt ?? post.title} fill priority sizes="(max-width: 760px) 100vw, 1040px" /></div> : <div className="post-cover" role="img" aria-label="Imagem de capa do artigo"><div className="post-cover-table" /><span>MK</span></div>}

        <div className="post-content">
          <div className="post-html" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
          <div className="post-share"><strong>Compartilhe este conteúdo</strong><div>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Compartilhar no WhatsApp"><MessageCircle size={18} /></a>
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="Compartilhar no LinkedIn"><b>in</b></a>
          </div></div>
        </div>
      </article>

      {relatedPosts.length > 0 && <section className="post-related wrap"><h2>Leia mais</h2><div>{relatedPosts.map((relatedPost) => <BlogCard post={relatedPost} related key={relatedPost.id} />)}</div><Link className="button" href="/blog">Ver todos os conteúdos</Link></section>}
      <BlogFooter />
    </main>
  );
}
