import type { Metadata } from "next";
import { LegalPage } from "../_components/legal-page";

export const metadata: Metadata = { title: "LGPD", description: "Compromisso da MK Síndico Profissional com a Lei Geral de Proteção de Dados.", alternates: { canonical: "/lgpd" } };

export default function LgpdPage() {
  return <LegalPage eyebrow="Proteção de dados" title="LGPD na MK" intro="A MK trata dados pessoais com responsabilidade, transparência e respeito aos princípios da Lei Geral de Proteção de Dados." sections={[
    { title: "Nosso compromisso", paragraphs: ["O tratamento de dados é limitado ao necessário para atender solicitações, executar serviços, cumprir obrigações e manter uma relação segura com clientes e interessados."] },
    { title: "Princípios aplicados", paragraphs: ["Nossas práticas buscam observar finalidade, adequação, necessidade, transparência, segurança, prevenção e não discriminação."], items: ["Coletar somente dados pertinentes", "Informar por que os dados são utilizados", "Restringir o acesso às pessoas autorizadas", "Eliminar ou anonimizar dados quando cabível"] },
    { title: "Bases legais", paragraphs: ["Conforme a situação, o tratamento pode se apoiar em consentimento, execução de contrato ou procedimentos preliminares, cumprimento de obrigação legal, exercício regular de direitos ou legítimo interesse avaliado de forma responsável."] },
    { title: "Titulares de dados", paragraphs: ["Clientes, moradores, conselheiros, fornecedores, candidatos, parceiros e visitantes do site podem ter dados tratados no contexto de sua relação com a MK."] },
    { title: "Solicitação de direitos", paragraphs: ["Para exercer direitos previstos na LGPD, envie uma solicitação ao canal de contato. Poderemos pedir informações adicionais para confirmar a identidade do solicitante e proteger os dados contra acesso indevido."] },
    { title: "Incidentes e governança", paragraphs: ["A MK mantém procedimentos para avaliar riscos e responder a incidentes. Quando necessário, titulares e a Autoridade Nacional de Proteção de Dados serão comunicados conforme a legislação aplicável."] },
  ]} />;
}
