import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ChevronLeft, ChevronRight, Clock3 } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog MK | Gestão Condominial",
  description: "Conteúdos sobre gestão condominial, sindicatura profissional, governança, planejamento, finanças, contratos e operação.",
  alternates: { canonical: "/blog" },
};

const posts = [
  ["Gestão condominial", "Planejamento orçamentário condominial: como fazer do jeito certo", "Um planejamento orçamentário bem estruturado garante previsibilidade financeira e evita surpresas ao longo do ano.", "18 de maio de 2025", "5 min de leitura", "budget"],
  ["Governança", "Governança condominial: transparência que gera confiança", "Boas práticas de governança aumentam a credibilidade da gestão e fortalecem a relação entre síndico, conselho e condôminos.", "12 de maio de 2025", "6 min de leitura", "governance", "governanca-condominial-transparencia-que-gera-confianca"],
  ["Contratos", "Contratos no condomínio: cuidados essenciais para evitar riscos", "Cláusulas bem definidas e acompanhamento adequado protegem o condomínio de passivos e prejuízos.", "05 de maio de 2025", "4 min de leitura", "contracts"],
  ["Síndico profissional", "Síndico profissional: quando e por que essa escolha faz a diferença", "Entenda os principais benefícios da gestão profissional e como ela agrega valor ao seu condomínio.", "28 de abril de 2025", "5 min de leitura", "building"],
  ["Finanças", "Fluxo de caixa condominial: como manter as contas sempre em dia", "Acompanhar o fluxo de caixa é fundamental para uma gestão financeira saudável e sustentável.", "21 de abril de 2025", "4 min de leitura", "finance"],
  ["Operação", "Manutenção preventiva: menos custos, mais segurança", "A manutenção preventiva reduz falhas, prolonga a vida útil dos equipamentos e evita despesas emergenciais.", "14 de abril de 2025", "5 min de leitura", "operation"],
  ["Conselho", "Conselho consultivo: parceiro estratégico para uma gestão mais eficiente", "Atuação conjunta entre síndico e conselho eleva o nível das decisões e fortalece o condomínio.", "07 de abril de 2025", "4 min de leitura", "council"],
  ["Planejamento", "Plano de ação: do papel à execução com foco em resultados", "Transformar planejamento em ações práticas é o que gera resultados concretos no condomínio.", "31 de março de 2025", "6 min de leitura", "planning"],
  ["Gestão condominial", "Comunicação no condomínio: clareza que evita conflitos", "Uma comunicação eficiente aproxima, informa e reduz ruídos entre gestão e condôminos.", "24 de março de 2025", "4 min de leitura", "communication"],
];

const categories = ["Todos", "Síndico Profissional", "Gestão Condominial", "Governança", "Conselho", "Planejamento", "Finanças", "Contratos", "Operação"];

export default function BlogPage() {
  return <main className="blog-page">
    <header className="blog-header">
      <Link href="/" aria-label="MK Síndico Profissional — início"><Image src="/logo.webp" alt="MK Síndico Profissional" width={165} height={55} priority /></Link>
      <nav><Link href="/#solucoes">Soluções</Link><Link href="/#metodo-mk">Método MK</Link><Link href="/diagnostico">Diagnóstico</Link><Link href="/#sobre">Marcos Kowalewski</Link><Link href="/blog">Conteúdo</Link><Link href="/#contato">Contato</Link></nav>
      <Link className="button button-small" href="/diagnostico">Fazer diagnóstico</Link>
    </header>

    <section className="blog-hero"><div className="wrap"><div className="blog-breadcrumb"><Link href="/">Home</Link><span>›</span><span>Blog</span></div><h1>Blog MK</h1><span className="blog-title-rule"/><p>Conteúdos sobre gestão condominial, sindicatura profissional, governança, planejamento, finanças, contratos e operação.</p></div></section>

    <section className="blog-listing"><div className="wrap">
      <div className="blog-filters"><strong>Categorias</strong><div>{categories.map((category, index) => <button className={index === 0 ? "active" : ""} type="button" key={category}>{category}</button>)}</div></div>
      <div className="blog-grid">{posts.map(([category,title,excerpt,date,time,tone,slug]) => <article className="blog-card" key={title}><div className={`blog-card-image ${tone}`} aria-hidden="true"><span>MK</span></div><div className="blog-card-copy"><span className="blog-tag">{category}</span><h2>{slug ? <Link href={`/blog/${slug}`}>{title}</Link> : title}</h2><p>{excerpt}</p><div className="blog-meta"><span><CalendarDays size={14}/>{date}</span><span><Clock3 size={14}/>{time}</span></div></div></article>)}</div>
      <nav className="blog-pagination" aria-label="Paginação"><button type="button" aria-label="Página anterior"><ChevronLeft size={15}/></button>{[1,2,3,4,5].map((page) => <button className={page === 1 ? "active" : ""} type="button" key={page}>{page}</button>)}<span>…</span><button type="button">10</button><button type="button" aria-label="Próxima página"><ChevronRight size={15}/></button></nav>
    </div></section>

    <footer className="blog-footer"><div className="wrap blog-footer-grid"><div><Image src="/logo.webp" alt="MK Síndico Profissional" width={155} height={52}/><p>Gestão condominial com experiência executiva, método e governança para proteger e valorizar o patrimônio.</p></div><div><h3>Soluções</h3><Link href="/solucoes/sindico-profissional">Síndico Profissional</Link><Link href="/solucoes/consultoria-condominial">Consultoria Condominial</Link><Link href="/solucoes/implantacao-condominial">Implantação Condominial</Link><Link href="/solucoes/conselheiro-profissional">Conselheiro Profissional</Link></div><div><h3>Conheça a MK</h3><Link href="/#sobre">Sobre a MK</Link><Link href="/#metodo-mk">Método MK</Link><Link href="/diagnostico">Diagnóstico</Link><Link href="/blog">Conteúdo</Link></div><div><h3>Institucional</h3><Link href="/politica-de-privacidade">Política de Privacidade</Link><Link href="/termos-de-uso">Termos de Uso</Link><Link href="/lgpd">LGPD</Link></div></div><div className="wrap blog-copyright"><span>© 2026 MK Síndico Profissional.</span><span>Desenvolvido com estratégia, método e gestão.</span></div></footer>
  </main>;
}
