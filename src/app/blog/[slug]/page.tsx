import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileCheck2,
  Link2,
  MessageCircle,
  Scale,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

const slug = "governanca-condominial-transparencia-que-gera-confianca";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ slug }];
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const route = await params;
  if (route.slug !== slug) return {};
  return {
    title: "Governança condominial: transparência que gera confiança | Blog MK",
    description: "Entenda como boas práticas de governança fortalecem a transparência, a responsabilidade e a eficiência da gestão condominial.",
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: "Governança condominial: transparência que gera confiança",
      description: "Boas práticas para fortalecer a gestão e a relação entre síndico, conselho e condôminos.",
      type: "article",
      publishedTime: "2025-05-12T09:00:00-03:00",
    },
  };
}

const pillars = [
  [UsersRound, "Transparência", "Informações claras e acessíveis a todos."],
  [ShieldCheck, "Responsabilidade", "Papéis e deveres bem definidos e cumpridos."],
  [FileCheck2, "Prestação de contas", "Relatórios e resultados disponibilizados com clareza."],
  [Scale, "Equidade", "Tratamento justo entre todos os condôminos."],
  [BarChart3, "Eficiência", "Processos estruturados e foco em resultados."],
] as const;

const related = [
  ["Contratos", "Contratos no condomínio: cuidados essenciais para evitar riscos", "05 de maio de 2025", "4 min de leitura", "contracts"],
  ["Síndico profissional", "Síndico profissional: quando e por que essa escolha faz a diferença", "28 de abril de 2025", "5 min de leitura", "building"],
  ["Finanças", "Fluxo de caixa condominial: como manter as contas sempre em dia", "21 de abril de 2025", "4 min de leitura", "finance"],
] as const;

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const route = await params;
  if (route.slug !== slug) notFound();

  return <main className="blog-page post-page">
    <header className="blog-header">
      <Link href="/" aria-label="MK Síndico Profissional — início"><Image src="/logo.webp" alt="MK Síndico Profissional" width={165} height={55} priority /></Link>
      <nav><Link href="/#solucoes">Soluções</Link><Link href="/#metodo-mk">Método MK</Link><Link href="/diagnostico">Diagnóstico</Link><Link href="/#sobre">Marcos Kowalewski</Link><Link href="/blog">Conteúdo</Link><Link href="/#contato">Contato</Link></nav>
      <Link className="button button-small" href="/diagnostico">Fazer diagnóstico</Link>
    </header>

    <article>
      <header className="post-hero"><div className="wrap post-hero-inner">
        <div className="blog-breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/blog">Blog</Link><span>›</span><span>Governança condominial</span></div>
        <span className="post-category">Governança</span>
        <h1>Governança condominial:<br/>transparência que gera confiança</h1>
        <p>Boas práticas de governança aumentam a credibilidade da gestão e fortalecem a relação entre síndico, conselho e condôminos.</p>
        <div className="post-meta"><span><CalendarDays size={15}/>12 de maio de 2025</span><span><Clock3 size={15}/>6 min de leitura</span></div>
      </div></header>

      <div className="post-cover" role="img" aria-label="Reunião de governança condominial em uma sala executiva"><div className="post-cover-table"/><span>MK</span></div>

      <div className="post-content">
        <p className="post-lead">A governança condominial vai muito além do cumprimento de obrigações legais. Ela estabelece princípios, processos e práticas que promovem transparência, responsabilidade e eficiência na gestão, gerando confiança entre todos os envolvidos.</p>
        <p>Quando bem aplicada, a governança fortalece a tomada de decisões, organiza informações e cria um ambiente mais colaborativo e sustentável para o condomínio.</p>

        <h2>O que é governança condominial?</h2>
        <p>Governança condominial é o conjunto de boas práticas que orienta a gestão do condomínio com base em transparência, equidade, prestação de contas, responsabilidade e eficiência.</p>
        <p>Ela envolve a definição clara de papéis e responsabilidades, o respeito às normas, o planejamento estruturado e a comunicação objetiva entre síndico, conselho e condôminos.</p>

        <h2>Benefícios da governança para o condomínio</h2>
        <ul className="post-benefits">
          {[
            "Mais transparência na administração e nas decisões.",
            "Prestação de contas clara e organizada.",
            "Redução de conflitos e ruídos de comunicação.",
            "Decisões mais assertivas, baseadas em dados e planejamento.",
            "Valorização do patrimônio e melhoria contínua da gestão.",
          ].map((benefit) => <li key={benefit}><CheckCircle2 size={15}/>{benefit}</li>)}
        </ul>

        <h2>Pilares da governança condominial</h2>
        <p>Para que a governança seja efetiva, ela deve se apoiar em pilares que sustentam uma gestão sólida e confiável.</p>
        <div className="post-pillars">{pillars.map(([Icon, title, text]) => <div key={title}><Icon size={35}/><strong>{title}</strong><span>{text}</span></div>)}</div>

        <h2>Como implementar no seu condomínio?</h2>
        <p>A implementação da governança requer compromisso da gestão e participação ativa do conselho. Comece por organizar os processos, padronizar rotinas e garantir que as informações estejam sempre disponíveis.</p>
        <p>Com o apoio de uma sindicatura profissional, é possível implantar boas práticas de forma estruturada e sustentável, gerando confiança e resultados consistentes.</p>

        <div className="post-share"><strong>Compartilhe este conteúdo</strong><div><button type="button" aria-label="Compartilhar no WhatsApp"><MessageCircle size={18}/></button><button type="button" aria-label="Compartilhar no LinkedIn"><b>in</b></button><button type="button" aria-label="Compartilhar no Facebook"><b>f</b></button><button type="button" aria-label="Copiar link"><Link2 size={18}/></button></div></div>
      </div>
    </article>

    <section className="post-related wrap"><h2>Leia mais</h2><div>{related.map(([category, title, date, time, tone]) => <article className="post-related-card" key={title}><div className={`blog-card-image ${tone}`} aria-hidden="true"><span>MK</span></div><div><span className="blog-tag">{category}</span><h3>{title}</h3><div className="blog-meta"><span><CalendarDays size={13}/>{date}</span><span><Clock3 size={13}/>{time}</span></div></div></article>)}</div><Link className="button" href="/blog">Ver todos os conteúdos</Link></section>

    <footer className="blog-footer"><div className="wrap blog-footer-grid"><div><Image src="/logo.webp" alt="MK Síndico Profissional" width={155} height={52}/><p>Gestão condominial com experiência executiva, método e governança para proteger e valorizar o patrimônio.</p></div><div><h3>Soluções</h3><Link href="/solucoes/sindico-profissional">Síndico Profissional</Link><Link href="/solucoes/consultoria-condominial">Consultoria Condominial</Link><Link href="/solucoes/implantacao-condominial">Implantação Condominial</Link><Link href="/solucoes/conselheiro-profissional">Conselheiro Profissional</Link></div><div><h3>Conheça a MK</h3><Link href="/#sobre">Sobre a MK</Link><Link href="/#metodo-mk">Método MK</Link><Link href="/diagnostico">Diagnóstico</Link><Link href="/blog">Conteúdo</Link></div><div><h3>Institucional</h3><Link href="/politica-de-privacidade">Política de Privacidade</Link><Link href="/termos-de-uso">Termos de Uso</Link><Link href="/lgpd">LGPD</Link></div></div><div className="wrap blog-copyright"><span>© 2026 MK Síndico Profissional.</span><span>Desenvolvido com estratégia, método e gestão.</span></div></footer>
  </main>;
}
