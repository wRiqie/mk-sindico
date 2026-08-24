import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BlogCard } from "@/app/blog/_components/blog-card";
import { BlogFooter, BlogHeader } from "@/app/blog/_components/blog-chrome";
import { getBlogPosts } from "@/lib/blog-api";

export const metadata: Metadata = {
  title: "Blog MK | Gestão Condominial",
  description: "Conteúdos sobre gestão condominial, sindicatura profissional, governança, planejamento, finanças, contratos e operação.",
  alternates: { canonical: "/blog" },
};

export const dynamic = "force-dynamic";
const PAGE_SIZE = 9;

function parsePage(value?: string) {
  if (!value || !/^\d+$/.test(value)) return 1;
  return Math.max(1, Number(value));
}
function blogHref(page: number, category?: string) {
  const params = new URLSearchParams();
  if (page > 1) params.set("page", String(page));
  if (category) params.set("category", category);
  const query = params.toString();
  return query ? `/blog?${query}` : "/blog";
}

function paginationItems(current: number, total: number) {
  const pages = [...new Set([1, total, current - 1, current, current + 1])]
    .filter((page) => page >= 1 && page <= total)
    .sort((a, b) => a - b);
  const items: Array<number | "ellipsis"> = [];
  pages.forEach((page, index) => {
    if (index > 0 && page - pages[index - 1] > 1) items.push("ellipsis");
    items.push(page);
  });
  return items;
}

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ page?: string; category?: string }> }) {
  const query = await searchParams;
  const requestedPage = parsePage(query.page);
  const selectedCategory = query.category?.trim() || undefined;
  const result = await getBlogPosts(requestedPage, PAGE_SIZE, selectedCategory).catch(() => null);

  return (
    <main className="blog-page">
      <BlogHeader />
      <section className="blog-hero"><div className="wrap">
        <div className="blog-breadcrumb"><Link href="/">Home</Link><span>›</span><span>Blog</span></div>
        <h1>Blog MK</h1><span className="blog-title-rule" />
        <p>Conteúdos sobre gestão condominial, sindicatura profissional, governança, planejamento, finanças, contratos e operação.</p>
      </div></section>

      <section className="blog-listing"><div className="wrap">
        {result ? <>
          <nav className="blog-filters" aria-label="Filtrar por categoria"><strong>Categorias</strong><div>
            <Link className={!result.filter.category ? "active" : ""} href="/blog">Todos</Link>
            {result.categories.map((category) => <Link className={result.filter.category === category.slug ? "active" : ""} href={blogHref(1, category.slug)} key={category.slug}>{category.name}</Link>)}
          </div></nav>

          {result.posts.length > 0 ? <div className="blog-grid">{result.posts.map((post) => <BlogCard post={post} key={post.id} />)}</div> : <div className="blog-empty"><strong>Nenhum conteúdo encontrado</strong><p>Escolha outra categoria para continuar explorando o blog.</p><Link href="/blog">Ver todos os conteúdos</Link></div>}

          {result.pagination.totalPages > 1 && <nav className="blog-pagination" aria-label="Paginação">
            {result.pagination.hasPreviousPage && <Link href={blogHref(requestedPage - 1, result.filter.category ?? undefined)} aria-label="Página anterior"><ChevronLeft size={15} /></Link>}
            {paginationItems(result.pagination.page, result.pagination.totalPages).map((item, index) => item === "ellipsis" ? <span key={`ellipsis-${index}`}>…</span> : <Link className={item === result.pagination.page ? "active" : ""} href={blogHref(item, result.filter.category ?? undefined)} key={item} aria-current={item === result.pagination.page ? "page" : undefined}>{item}</Link>)}
            {result.pagination.hasNextPage && <Link href={blogHref(requestedPage + 1, result.filter.category ?? undefined)} aria-label="Próxima página"><ChevronRight size={15} /></Link>}
          </nav>}
        </> : <div className="blog-empty blog-error" role="alert"><strong>Não foi possível carregar os conteúdos</strong><p>Atualize a página para tentar novamente.</p></div>}
      </div></section>
      <BlogFooter />
    </main>
  );
}
