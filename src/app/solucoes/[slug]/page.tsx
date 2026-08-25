import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ClipboardCheck, ShieldCheck } from "lucide-react";
import { notFound } from "next/navigation";

const solutions = {
  "sindico-profissional": {
    eyebrow: "Síndico profissional",
    title: "Liderança executiva para uma gestão condominial mais segura.",
    intro: "A MK assume a condução da gestão com presença, método e responsabilidade. Organiza prioridades, coordena fornecedores e apoia decisões com informações claras.",
    ideal: "Condomínios que precisam profissionalizar a gestão, reduzir improvisos e estabelecer uma rotina confiável de acompanhamento.",
    scopes: ["Representação legal e condução das assembleias", "Gestão financeira, contratos e fornecedores", "Coordenação da operação e das equipes", "Comunicação estruturada com Conselho e moradores"],
    outcomes: ["Mais previsibilidade na operação", "Decisões documentadas e transparentes", "Responsabilidades e prioridades claras"],
  },
  "consultoria-condominial": {
    eyebrow: "Consultoria condominial",
    title: "Clareza para corrigir problemas e fortalecer a gestão.",
    intro: "Uma análise independente da realidade do condomínio para identificar riscos, organizar prioridades e construir um plano de ação viável.",
    ideal: "Gestões que enfrentam custos elevados, contratos frágeis, processos desorganizados ou precisam preparar decisões importantes.",
    scopes: ["Diagnóstico da gestão e dos principais riscos", "Análise de contratos, custos e rotinas", "Definição de prioridades e plano de ação", "Apoio técnico ao síndico e ao Conselho"],
    outcomes: ["Visão objetiva do cenário atual", "Plano de melhoria executável", "Maior segurança para decidir"],
  },
  "implantacao-condominial": {
    eyebrow: "Implantação condominial",
    title: "Uma operação bem estruturada desde o primeiro dia.",
    intro: "A MK organiza a transição do empreendimento para a vida condominial, estabelecendo processos, contratos e responsabilidades antes que a operação ganhe complexidade.",
    ideal: "Novos condomínios, empreendimentos recém-entregues ou operações que precisam ser reorganizadas com bases mais sólidas.",
    scopes: ["Planejamento da entrada em operação", "Estruturação de rotinas, controles e documentos", "Contratação e mobilização de fornecedores", "Apoio à primeira gestão e ao Conselho"],
    outcomes: ["Início de operação coordenado", "Menos riscos e retrabalho", "Processos claros desde a implantação"],
  },
  "conselheiro-profissional": {
    eyebrow: "Conselheiro profissional",
    title: "Análise independente para decisões mais consistentes.",
    intro: "Apoio técnico e estratégico para que o Conselho acompanhe a gestão, avalie informações e exerça seu papel de governança com segurança.",
    ideal: "Conselhos que desejam ampliar sua capacidade de análise sem interferir na operação cotidiana ou assumir funções executivas.",
    scopes: ["Leitura crítica de relatórios e indicadores", "Análise de propostas, contratos e investimentos", "Acompanhamento de planos de ação", "Orientação sobre governança e responsabilidades"],
    outcomes: ["Fiscalização mais qualificada", "Decisões baseadas em evidências", "Governança fortalecida"],
  },
} as const;

type SolutionSlug = keyof typeof solutions;

export function generateStaticParams() {
  return Object.keys(solutions).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/solucoes/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const solution = solutions[slug as SolutionSlug];
  if (!solution) return {};
  return {
    title: solution.eyebrow,
    description: solution.intro,
    alternates: { canonical: `/solucoes/${slug}` },
  };
}

export default async function SolutionPage({ params }: PageProps<"/solucoes/[slug]">) {
  const { slug } = await params;
  const solution = solutions[slug as SolutionSlug];
  if (!solution) notFound();

  return <main className="solution-page">
    <header className="solution-header">
      <Link href="/" aria-label="Voltar para a página inicial"><Image src="/logo.webp" alt="MK Síndico Profissional" width={165} height={55} priority /></Link>
      <nav><Link href="/#solucoes">Soluções</Link><Link href="/#metodo-mk">Método MK</Link><Link href="/diagnostico">Diagnóstico</Link><Link className="solution-header-cta" href="/#contato">Falar com a MK</Link></nav>
    </header>

    <section className="solution-hero">
      <div className="wrap solution-hero-grid">
        <div><span className="solution-eyebrow">{solution.eyebrow}</span><h1>{solution.title}</h1><p>{solution.intro}</p><div className="button-row"><Link className="button" href="/#contato">Conversar sobre esta solução <ArrowRight size={16}/></Link><Link className="button button-ghost" href="/diagnostico">Fazer Diagnóstico da Gestão do Condomínio Gratuito</Link></div></div>
        <aside><ShieldCheck size={34}/><strong>Gestão com método</strong><p>Experiência executiva aplicada à realidade do condomínio, com governança, acompanhamento e foco em resultados.</p></aside>
      </div>
    </section>

    <section className="solution-content wrap">
      <div className="solution-scope">
        <span className="solution-label">O que está incluído</span>
        <h2>Atuação prática, responsabilidades claras.</h2>
        <div className="scope-list">{solution.scopes.map((item) => <div key={item}><CheckCircle2 size={19}/><span>{item}</span></div>)}</div>
      </div>
      <aside className="solution-fit"><ClipboardCheck size={28}/><span className="solution-label">Quando faz sentido</span><p>{solution.ideal}</p></aside>
    </section>

    <section className="solution-results"><div className="wrap"><span className="solution-label">Resultados esperados</span><h2>Uma gestão que ganha direção e consistência.</h2><div>{solution.outcomes.map((item, index) => <article key={item}><b>0{index + 1}</b><p>{item}</p></article>)}</div></div></section>

    <section className="solution-bottom"><div className="wrap"><div><span className="solution-label">Próximo passo</span><h2>Entenda o cenário antes de definir a solução.</h2><p>Converse com a MK ou comece pelo diagnóstico da maturidade da gestão condominial.</p></div><Link className="button" href="/diagnostico">Iniciar diagnóstico <ArrowRight size={16}/></Link></div></section>

    <footer className="solution-footer"><div className="wrap"><Image src="/logo.webp" alt="MK Síndico Profissional" width={145} height={49}/><p>Gestão condominial com experiência executiva, governança e método.</p><Link href="/">Voltar para a página inicial</Link></div></footer>
  </main>;
}
