import type { Metadata } from "next";
import { LegalPage } from "../_components/legal-page";

export const metadata: Metadata = { title: "Termos de Uso", description: "Condições para utilização do site da MK Síndico Profissional.", alternates: { canonical: "/termos-de-uso" } };

export default function TermsPage() {
  return <LegalPage eyebrow="Institucional" title="Termos de Uso" intro="Estes termos estabelecem as condições para navegar no site, utilizar o diagnóstico e acessar os conteúdos da MK." sections={[
    { title: "Aceitação dos termos", paragraphs: ["Ao acessar este site, você declara ter lido e concordado com estes termos. Caso não concorde, interrompa a utilização do site e de suas funcionalidades."] },
    { title: "Finalidade do site", paragraphs: ["O site apresenta os serviços da MK, disponibiliza conteúdos informativos e oferece uma ferramenta inicial de diagnóstico da gestão condominial."], items: ["O conteúdo não substitui análise técnica específica", "O diagnóstico possui caráter orientativo", "A contratação de serviços depende de proposta e instrumento próprios"] },
    { title: "Uso adequado", paragraphs: ["Você se compromete a fornecer informações verdadeiras e a não utilizar o site para fins ilícitos, tentativas de acesso indevido, interferência técnica ou violação de direitos de terceiros."] },
    { title: "Propriedade intelectual", paragraphs: ["Textos, identidade visual, metodologia, materiais e demais conteúdos pertencem à MK ou são utilizados mediante autorização. A reprodução comercial ou modificação depende de autorização prévia."] },
    { title: "Disponibilidade e responsabilidades", paragraphs: ["Buscamos manter o site disponível e atualizado, mas não garantimos funcionamento ininterrupto. A MK não se responsabiliza por decisões tomadas exclusivamente com base em conteúdo geral, sem avaliação do contexto específico."] },
    { title: "Links e alterações", paragraphs: ["Links externos podem levar a serviços de terceiros, sujeitos às próprias regras. Estes termos podem ser atualizados e a versão vigente será sempre publicada nesta página."] },
  ]} />;
}
