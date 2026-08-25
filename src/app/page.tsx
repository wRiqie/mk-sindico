import { getBlogPosts } from "@/lib/blog-api";
import { CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

const blogDateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  timeZone: "America/Sao_Paulo",
});

const problems = [
  [
    "problem_bell.webp",
    "Manutenções emergenciais",
    "Problemas identificados somente quando já exigem intervenção.",
  ],
  [
    "problem_document.webp",
    "Contratos sem acompanhamento",
    "Fornecedores contratados sem indicadores claros de desempenho.",
  ],
  [
    "problem_coin.webp",
    "Custos imprevisíveis",
    "Despesas que surgem sem planejamento adequado.",
  ],
  [
    "problem_condominium.webp",
    "Obras sem planejamento",
    "Intervenções realizadas sem visão integrada de prioridades.",
  ],
  [
    "problem_charts.webp",
    "Decisões sem informação",
    "Conselho e gestão tomando decisões com informações fragmentadas.",
  ],
  [
    "problem_sync.webp",
    "Problemas recorrentes",
    "Ocorrências resolvidas pontualmente sem tratamento da causa.",
  ],
];
const process = [
  ["organization_calendar.webp", "Planejar"],
  ["organization_gear.webp", "Executar"],
  ["organization_charts.webp", "Medir"],
  ["organization_checklist.webp", "Corrigir"],
  ["organization_trends.webp", "Evoluir"],
];
const pillars = [
  [
    "syndic_condominium.webp",
    "Governança",
    "Transparência, responsabilidades e prestação de contas.",
  ],
  [
    "syndic_gear.webp",
    "Operação",
    "Rotinas, equipes, fornecedores, controles e execução.",
  ],
  [
    "syndic_trends.webp",
    "Controle",
    "Indicadores, planos de ação e acompanhamento de resultados.",
  ],
  [
    "syndic_people.webp",
    "Pessoas",
    "Comunicação, relacionamentos e gestão de conflitos.",
  ],
];
const methodSteps = [
  [
    "method_search.webp",
    "Diagnosticar",
    "Compreender o cenário atual, prioridades, riscos e pontos de atenção.",
  ],
  [
    "method_path.webp",
    "Planejar",
    "Definir prioridades, responsabilidades, ações e cronogramas.",
  ],
  [
    "method_flow.webp",
    "Estruturar",
    "Organizar processos, rotinas, responsabilidades e instrumentos de acompanhamento.",
  ],
  [
    "method_checklist.webp",
    "Executar",
    "Transformar planejamento em ações coordenadas.",
  ],
  [
    "method_growth.webp",
    "Monitorar",
    "Acompanhar prioridades, indicadores, planos de ação e evolução da gestão.",
  ],
  [
    "method_trend_up.webp",
    "Evoluir",
    "Revisar continuamente a operação e identificar oportunidades de melhoria.",
  ],
];
const credentials = [
  [
    "about_syndic.webp",
    "+35 anos",
    "de experiência em gestão e liderança empresarial",
  ],
  ["about_condominium.webp", "Experiência executiva", "em grandes empresas"],
  ["about_security.webp", "Formação em", "Governança Corporativa pelo IBGC"],
  ["about_people.webp", "Foco em processos,", "pessoas e resultados"],
];
const services = [
  [
    "Síndico profissional",
    "Gestão executiva, representação e acompanhamento de operação com visão profissional e estruturada.",
    "sindico_profissional.webp",
  ],
  [
    "Consultoria condominial",
    "Diagnóstico, análise e estruturação da gestão para resolver problemas ou potencializar resultados.",
    "consultoria_condominial.webp",
  ],
  [
    "Implantação condominial",
    "Estruturação da operação para condomínios em fase de implantação ou início de funcionamento.",
    "implantacao_condominial.webp",
  ],
  [
    "Conselheiro profissional",
    "Apoio técnico e independente para fortalecer a governança e auxiliar o Conselho na tomada de decisões.",
    "conselheiro_profissional.webp",
  ],
];
const serviceSlugs = [
  "sindico-profissional",
  "consultoria-condominial",
  "implantacao-condominial",
  "conselheiro-profissional",
];
const cases = [
  [
    "Condomínio residencial — Zona Oeste · SP",
    "Desorganização com controles",
    "Redução de custos e melhorias",
  ],
  [
    "Condomínio residencial — Alphaville · SP",
    "Custos elevados e pouca visibilidade",
    "Melhor controle e decisões baseadas em informações",
  ],
  [
    "Condomínio comercial — Região da Paulista · SP",
    "Processos descontrolados e comunicação falha",
    "Mais eficiência operacional e melhor relacionamento",
  ],
];
const faqs = [
  {
    question: "O que faz um síndico profissional?",
    answer: [
      "O síndico profissional é responsável pela gestão estratégica, administrativa, financeira e operacional do condomínio. Seu trabalho envolve planejamento, controle de despesas, gestão de contratos e fornecedores, acompanhamento de manutenções, liderança de equipes, prestação de contas, cumprimento das obrigações legais e comunicação com Conselho e moradores.",
      "Na MK Síndico Profissional, a gestão é conduzida com método, processos e indicadores, buscando mais organização, transparência, previsibilidade e segurança para o condomínio.",
    ],
  },
  {
    question: "Quando vale a pena contratar um síndico profissional?",
    answer: [
      "A contratação de um síndico profissional pode ser especialmente indicada quando o condomínio enfrenta dificuldades recorrentes de gestão, falta de planejamento, problemas com fornecedores, ausência de manutenção preventiva, conflitos, pouca transparência financeira, sobrecarga do síndico morador ou dificuldade para executar as decisões do Conselho e das assembleias.",
      "Também não é necessário esperar surgir uma crise. A gestão profissional pode ser adotada de forma preventiva para organizar processos, reduzir riscos e aumentar a previsibilidade administrativa, operacional e financeira do condomínio.",
    ],
  },
  {
    question: "Como funciona a contratação da MK?",
    answer: [
      "A contratação começa com uma conversa para entendermos o cenário atual, as características do condomínio, sua estrutura, principais desafios e expectativas do Conselho e dos moradores.",
      "A partir desse levantamento, a MK Síndico Profissional apresenta uma proposta de atuação adequada às necessidades identificadas.",
      "Após a aprovação e os procedimentos previstos pelo condomínio, é realizado o planejamento da transição e o início da gestão, com definição de prioridades, responsabilidades e processos.",
    ],
  },
  {
    question: "Quais tipos de condomínio a MK atende?",
    answer: [
      "A MK Síndico Profissional atua na gestão de condomínios residenciais de pequeno e grande porte, condomínios-clube, condomínios mistos e outros empreendimentos condominiais, considerando as características, estrutura e necessidades específicas de cada condomínio.",
      "Cada empreendimento é analisado individualmente para que o modelo de gestão seja adequado à sua realidade, estrutura operacional e principais desafios.",
    ],
  },
  {
    question: "Qual a diferença entre síndico profissional e administradora?",
    answer: [
      "A administradora e o síndico exercem funções diferentes e complementares na gestão do condomínio.",
      "A administradora presta suporte ao condomínio e ao síndico, auxiliando nas rotinas administrativas, financeiras, trabalhistas e documentais, conforme os serviços contratados.",
      "O síndico é o representante legal do condomínio, responsável por sua administração e pela defesa dos interesses comuns dos condôminos. Entre suas atribuições estão tomar e executar decisões de gestão, acompanhar contratos e fornecedores, conduzir a operação, cumprir e fazer cumprir as deliberações da assembleia e prestar contas de sua gestão aos condôminos.",
      "O síndico também pode ser responsabilizado civil e, conforme o caso, criminalmente por atos ou omissões praticados no exercício de suas funções, nos termos da legislação aplicável.",
      "Na MK, a atuação do síndico profissional ocorre em conjunto com administradora, Conselho, funcionários e fornecedores, mantendo claramente definidas as responsabilidades de cada parte.",
    ],
  },
  {
    question: "Em quais regiões a MK atua?",
    answer: [
      "A MK Síndico Profissional atua na Grande São Paulo, atendendo atualmente principalmente condomínios localizados nas zonas Sul, Oeste e Central da cidade de São Paulo.",
      "A possibilidade de atendimento é avaliada de acordo com a localização, porte, estrutura e necessidades de cada condomínio.",
      "Para verificar o atendimento ao seu condomínio, entre em contato com a MK informando a cidade ou bairro e as principais características do empreendimento.",
    ],
  },
  {
    question: "Quanto custa um síndico profissional?",
    answer: [
      "O valor da contratação de um síndico profissional varia de acordo com as características e a complexidade de cada condomínio.",
      "Entre os fatores considerados estão número de unidades, estrutura do empreendimento, quantidade de funcionários e fornecedores, demandas operacionais, situação administrativa e financeira e nível de dedicação necessário para a gestão.",
      "Por isso, a MK realiza uma análise antes de apresentar uma proposta. Dessa forma, o condomínio recebe uma solução compatível com suas necessidades reais, em vez de um serviço padronizado.",
      "Solicite uma avaliação e receba uma proposta para o seu condomínio.",
    ],
  },
  {
    question: "Como o Conselho acompanha a gestão da MK?",
    answer: [
      "Transparência e prestação de contas fazem parte do modelo de gestão da MK Síndico Profissional.",
      "O Conselho acompanha informações relevantes sobre a administração do condomínio, incluindo situação financeira, contratos, fornecedores, manutenções, projetos, ocorrências, ações executadas e prioridades da gestão.",
      "A proposta é permitir que o Conselho exerça seu papel de acompanhamento com informações organizadas e critérios objetivos, contribuindo para decisões mais fundamentadas.",
    ],
  },
  {
    question: "Como funciona o Diagnóstico da Gestão Condominial?",
    answer: [
      "O Diagnóstico da Gestão Condominial é uma avaliação que ajuda a identificar o nível de organização e maturidade da administração do condomínio.",
      "São analisados aspectos relacionados a planejamento, finanças, contratos, manutenção, processos, governança, comunicação, gestão de fornecedores e outros pontos relevantes para a operação.",
      "Ao final, o condomínio consegue visualizar pontos fortes, vulnerabilidades e oportunidades de melhoria.",
      "O diagnóstico também pode servir como ponto de partida para definir prioridades e estruturar um plano de evolução da gestão.",
      "Faça o Diagnóstico da Gestão Condominial da MK.",
    ],
  },
  {
    question: "Como funciona a troca de síndico?",
    answer: [
      "A substituição do síndico deve seguir a convenção do condomínio, as deliberações da assembleia e a legislação aplicável.",
      "Após a definição da nova gestão, é realizado um processo de transição que pode envolver documentos, contratos, informações financeiras, fornecedores, funcionários, manutenções em andamento, pendências e demais informações necessárias para garantir a continuidade da administração.",
      "Na MK, essa etapa é tratada de forma estruturada, buscando reduzir riscos, preservar informações e proporcionar uma transição organizada para a nova gestão.",
    ],
  },
];
const Arrow = () => <span aria-hidden="true">→</span>;

export default async function Home() {
  const latestPosts = await getBlogPosts(1, 3)
    .then((result) => result.posts)
    .catch(() => []);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "MK Síndico Profissional",
            url: "https://mksindico.com.br",
            logo: "https://mksindico.com.br/logo.webp",
            image: "https://mksindico.com.br/hero.webp",
            description:
              "Síndico profissional e gestão condominial com experiência executiva, governança e método.",
            areaServed: { "@type": "City", name: "São Paulo" },
            founder: { "@type": "Person", name: "Marcos Kowalewski" },
            serviceType: [
              "Síndico profissional",
              "Gestão condominial",
              "Consultoria condominial",
              "Governança condominial",
            ],
          }),
        }}
      />
      <header className="site-header">
        <a
          className="brand"
          href="#inicio"
          aria-label="MK Síndico Profissional — início"
        >
          <Image
            src="/logo.webp"
            alt="MK Síndico Profissional"
            width={170}
            height={57}
            priority
          />
        </a>
        <nav aria-label="Navegação principal">
          <a href="#solucoes">Soluções</a>
          <a href="#metodo-mk">Método MK</a>
          <a href="/diagnostico">Diagnóstico</a>
          <a href="#sobre">Marcos Kowalewski</a>
          <Link href="/blog">Conteúdo</Link>
          <a href="#sobre">Sobre a MK</a>
          <a href="#contato">Contato</a>
        </nav>
        <div className="header-actions">
          <a className="button button-small" href="/diagnostico">
            Fazer diagnóstico
          </a>
          <a className="outline-small" href="#contato">
            ◉ Falar com a MK
          </a>
        </div>
      </header>
      <section className="hero" id="inicio">
        <div className="wrap hero-content">
          <div className="hero-copy">
            <h1>
              Gestão condominial
              <br />
              não deve ser improviso.
              <br />
              <em>Deve ser método.</em>
            </h1>
            <p>
              Síndico Profissional e Gestão Condominial com experiência
              executiva, governança e método para mais controle,
              previsibilidade, segurança nas decisões e valorização do
              patrimônio.
            </p>
            <div className="button-row">
              <a className="button" href="https://wa.me/5511972055176">
                Solicitar uma Proposta Comercial <Arrow />
              </a>
              <a className="button button-ghost" href="/diagnostico">
                Fazer diagnóstico da gestão <Arrow />
              </a>
            </div>
          </div>
          <aside className="hero-card">
            <span className="signature">Marcos Kowalewski</span>
            <p>
              Mais de 35 anos de experiência em gestão e liderança empresarial
              aplicados à realidade condominial.
            </p>
            <a href="#sobre">
              Conheça sua trajetória <Arrow />
            </a>
          </aside>
        </div>
        <div className="hero-benefits wrap">
          {[
            ["hero_gear.webp", "+35 anos de experiência executiva"],
            ["hero_checklist.webp", "Gestão com método e processos"],
            ["hero_security.webp", "Governança e transparência"],
            [
              "hero_condominium.webp",
              "Foco em resultados e valorização do patrimônio",
            ],
          ].map(([icon, text]) => (
            <div key={icon}>
              <Image src={`/hero/${icon}`} alt="" width={36} height={36} />
              <strong>{text}</strong>
            </div>
          ))}
        </div>
      </section>
      <section className="section problem" id="metodo">
        <div className="wrap section-heading split-heading">
          <h2>
            Seu condomínio está sendo administrado
            <br />
            ou apenas reagindo aos problemas?
          </h2>
          <p>
            A gestão reativa resolve o problema de hoje.
            <br />
            <strong>
              Uma gestão profissional trabalha para evitar o problema de amanhã.
            </strong>
          </p>
        </div>
        <div className="wrap problem-grid">
          {problems.map(([icon, title, copy]) => (
            <article key={title}>
              <Image src={`/problem/${icon}`} alt="" width={50} height={50} />
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section organization">
        <div className="wrap organization-grid">
          <div className="section-heading">
            <h2>
              Um condomínio é como uma empresa.
              <br />E precisa ser gerido de forma profissional.
            </h2>
            <p>
              Patrimônio, orçamento, contratos, fornecedores, pessoas, riscos e
              decisões fazem parte de uma operação cada vez mais complexa.
            </p>
            <p>
              Por isso, a MK aplica princípios de gestão e governança à
              realidade condominial.
            </p>
          </div>
          <div className="process-flow">
            {process.map(([icon, title], i) => (
              <div className="process-step" key={title}>
                <Image
                  src={`/organization/${icon}`}
                  alt=""
                  width={58}
                  height={58}
                />
                <b>0{i + 1}</b>
                <strong>{title}</strong>
                {i < 4 && <span className="flow-arrow">→</span>}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="pillars">
        <div className="wrap">
          <div className="section-heading light">
            <h2>
              Muito além da sindicatura.
              <br />
              <em>Pilares da gestão MK.</em>
            </h2>
          </div>
          <div className="pillars-grid">
            {pillars.map(([icon, title, copy]) => (
              <article key={title}>
                <Image src={`/syndic/${icon}`} alt="" width={54} height={54} />
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="about" id="sobre">
        <div className="about-image">
          <Image
            src="/sobre-v2.webp"
            alt="Marcos Kowalewski, fundador da MK Síndico Profissional"
            fill
            sizes="(max-width: 700px) 100vw, 28vw"
          />
        </div>
        <div className="about-copy">
          <span className="eyebrow">Quem está à frente da MK</span>
          <h2>Marcos Kowalewski</h2>
          <h3>Mais de 35 anos de experiência em gestão.</h3>
          <p>
            O perfil profissional de Marcos registra mais de 35 anos de
            experiência em grandes empresas e formação no Instituto Brasileiro
            de Governança Corporativa — IBGC.
          </p>
          <p>
            Sua trajetória inclui experiência executiva em gestão e
            desenvolvimento de processos. Foi diretor regional pelo
            desenvolvimento e implementação do sistema de gestão Lean
            Construction na HTB Engenharia e, posteriormente, sócio-diretor da
            MK Gestão Empresarial.
          </p>
          <p>
            Hoje, essa experiência é aplicada à gestão condominial com método,
            governança, planejamento e foco em resultados sustentáveis.
          </p>
        </div>
        <div className="credentials">
          {credentials.map(([icon, title, copy]) => (
            <div key={title}>
              <Image src={`/about/${icon}`} alt="" width={44} height={44} />
              <p>
                <strong>{title}</strong>
                <br />
                {copy}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="method-mk" id="metodo-mk">
        <div className="wrap method-mk-intro">
          <h2>
            Gestão profissional
            <br />
            <em>começa por entender.</em>
          </h2>
          <p>
            Cada condomínio possui características, prioridades e desafios
            diferentes. Por isso, a atuação da MK parte da compreensão do
            cenário para estruturar uma gestão adequada à realidade do
            empreendimento.
          </p>
        </div>
        <div className="wrap method-mk-scroll" aria-label="Etapas do Método MK">
          <div className="method-mk-grid">
            {methodSteps.map(([icon, title, copy], index) => (
              <article className="method-card" key={title}>
                <span className="method-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Image src={`/method/${icon}`} alt="" width={88} height={88} />
                <h3>{title}</h3>
                <span className="method-rule" aria-hidden="true" />
                <p>{copy}</p>
                {index < methodSteps.length - 1 && (
                  <span className="method-arrow" aria-hidden="true">
                    ›
                  </span>
                )}
              </article>
            ))}
          </div>
        </div>
        <div className="method-mk-action">
          <a className="button" href="/diagnostico">
            Fazer Diagnóstico da Gestão do Condomínio Gratuito <Arrow />
          </a>
        </div>
      </section>
      <section className="section solutions" id="solucoes">
        <div className="wrap">
          <div className="section-heading heading-link">
            <h2>
              Soluções para diferentes
              <br />
              necessidades do condomínio.
            </h2>
          </div>
          <div className="solution-grid">
            {services.map(([title, copy, image], i) => (
              <article key={title} className={`service-card service-${i + 1}`}>
                <div className="service-art">
                  <Image
                    src={`/soluctions/${image}`}
                    alt={`${title} da MK Síndico Profissional`}
                    fill
                    sizes="(max-width: 700px) 100vw, (max-width: 960px) 50vw, 25vw"
                  />
                </div>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                  <Link href={`/solucoes/${serviceSlugs[i]}`}>
                    Saiba mais <Arrow />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section cases">
        <div className="wrap">
          <div className="section-heading heading-link">
            <h2>
              Experiência percebida na prática.
              <br />
              Condomínios que confiam na MK.
            </h2>
          </div>
          <div className="case-grid">
            {cases.map(([title, scenario, result]) => (
              <article key={title}>
                <h3>{title}</h3>
                <div className="case-body">
                  <div>
                    <b>Cenário</b>
                    <p>{scenario}</p>
                  </div>
                  <div>
                    <b>Ação MK</b>
                    <p>Planejamento, organização e método.</p>
                  </div>
                  <div>
                    <b>Resultado</b>
                    <p>{result}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="diagnostic" id="diagnostico">
        <div className="wrap diagnostic-grid">
          <div className="diagnostic-image">
            <Image
              src="/maturidade.webp"
              alt="Diagnóstico de maturidade da gestão condominial exibido em notebook"
              fill
              sizes="(max-width: 800px) 100vw, 34vw"
            />
          </div>
          <div>
            <h2>
              Qual é o nível de maturidade
              <br />
              da gestão do seu condomínio?
            </h2>
            <p>
              Avalie governança, planejamento, contratos, manutenção, finanças,
              operação, riscos e comunicação e descubra os principais pontos que
              merecem atenção.
            </p>
            <div className="diagnostic-benefits">
              <span>
                ♢ Avaliação completa
                <br />e personalizada
              </span>
              <span>
                ◷ Resultado em
                <br />
                poucos minutos
              </span>
              <span>
                ♢ Confidencial e<br />
                sem compromisso
              </span>
            </div>
          </div>
          <aside>
            <h3>
              Iniciar diagnóstico
              <br />
              gratuito
            </h3>
            <p>
              É rápido, simples e pode gerar insights importantes para o seu
              condomínio.
            </p>
            <a className="button" href="/diagnostico">
              Iniciar agora <Arrow />
            </a>
          </aside>
        </div>
      </section>
      <section className="knowledge" id="conteudo">
        <div className="wrap">
          <div className="knowledge-heading">
            <span aria-hidden="true" />
            <h2>
              Conhecimento para quem
              <br />
              toma <em>decisões no condomínio.</em>
            </h2>
            <p>
              Conteúdos sobre sindicatura profissional, governança,
              planejamento, finanças, contratos, operação e gestão condominial.
            </p>
          </div>
          {latestPosts.length > 0 ? (
            <div className="article-grid">
              {latestPosts.map((article) => (
                <article className="article-card" key={article.id}>
                  <Link className="article-link" href={`/blog/${article.slug}`}>
                    <div className="article-placeholder">
                      {article.coverImageUrl ? (
                        <Image
                          src={article.coverImageUrl}
                          alt={article.coverImageAlt ?? article.title}
                          fill
                          sizes="(max-width: 760px) 100vw, 33vw"
                        />
                      ) : (
                        <span aria-hidden="true">MK</span>
                      )}
                    </div>
                    <div className="article-copy">
                      <span className="article-tag">{article.category}</span>
                      <h3>{article.title}</h3>
                      <p>{article.excerpt}</p>
                      <div className="article-meta">
                        <span>
                          <CalendarDays size={14} />
                          {blogDateFormatter.format(
                            new Date(article.publishedAt),
                          )}
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <p className="article-empty">
              Novos conteúdos serão publicados em breve.
            </p>
          )}
          <div className="knowledge-action">
            <Link className="button" href="/blog">
              Ver todos os conteúdos <Arrow />
            </Link>
          </div>
        </div>
      </section>
      <section className="section faq">
        <div className="wrap">
          <div className="section-heading">
            <h2>Dúvidas frequentes</h2>
          </div>
          <div className="faq-grid">
            {faqs.map(({ question, answer }) => (
              <details key={question}>
                <summary>
                  {question}
                  <span>+</span>
                </summary>
                {answer.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className="final-cta" id="contato">
        <div className="wrap cta-grid">
          <div>
            <h2>
              O próximo problema não precisa ser
              <br />o motivo para profissionalizar a gestão.
            </h2>
            <p>
              Converse com a MK e descubra como uma gestão estruturada pode
              aumentar controle, previsibilidade e segurança.
            </p>
          </div>
          <a className="button" href="/diagnostico">
            Fazer diagnóstico da gestão
          </a>
          <a className="button button-ghost" href="https://wa.me/5511972055176">
            Conversar com a MK
          </a>
        </div>
      </section>
      <footer>
        <div className="wrap footer-grid">
          <div className="footer-brand">
            <Image
              src="/logo.webp"
              alt="MK Síndico Profissional"
              width={160}
              height={54}
            />
            <p>
              Síndico Profissional e Gestão Condominial com experiência
              executiva, método e governança para transformar a gestão e
              proteger o patrimônio do condomínio.
            </p>
          </div>
          <div>
            <h3>Soluções</h3>
            <Link href="/solucoes/sindico-profissional">
              Síndico Profissional
            </Link>
            <a href="#solucoes">Gestão Condominial</a>
            <Link href="/solucoes/consultoria-condominial">
              Consultoria Condominial
            </Link>
            <Link href="/solucoes/implantacao-condominial">
              Implantação Condominial
            </Link>
            <Link href="/solucoes/conselheiro-profissional">
              Conselheiro Profissional
            </Link>
          </div>
          <div>
            <h3>Gestão</h3>
            <a href="#metodo">Governança Condominial</a>
            <a href="#metodo">Planejamento</a>
            <a href="#metodo">Gestão Financeira</a>
            <a href="#metodo">Gestão de Contratos</a>
            <a href="#metodo">Gestão Operacional</a>
          </div>
          <div>
            <h3>Conheça a MK</h3>
            <a href="#sobre">Sobre a MK</a>
            <a href="#sobre">Marcos Kowalewski</a>
            <a href="#metodo">Método MK</a>
            <Link href="/blog">Cases e Experiências</Link>
            <a href="/diagnostico">Diagnóstico</a>
          </div>
          <div>
            <h3>Atendimento</h3>
            <p>São Paulo · SP</p>
            <p>(11) 97205-5176</p>
            <p>contato@mksindico.com.br</p>
          </div>
          <div>
            <h3>Institucional</h3>
            <Link href="/politica-de-privacidade">Política de Privacidade</Link>
            <Link href="/termos-de-uso">Termos de Uso</Link>
            <Link href="/lgpd">LGPD</Link>
          </div>
        </div>
        <div className="wrap copyright">
          <span>
            © 2026 MK Síndico Profissional. Todos os direitos reservados.
          </span>
          <a
            className="developer-credit"
            href="https://viabilizze.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Desenvolvido por Viabilizze — visitar site"
          >
            <span>Desenvolvido por</span>
            <Image
              src="/viabilizze.webp"
              alt="Viabilizze"
              width={116}
              height={26}
            />
            <span className="developer-credit-arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>
      </footer>
    </main>
  );
}
