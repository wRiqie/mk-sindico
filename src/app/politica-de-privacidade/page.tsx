import type { Metadata } from "next";
import { LegalPage } from "../_components/legal-page";

export const metadata: Metadata = { title: "Política de Privacidade", description: "Saiba como a MK Síndico Profissional trata e protege dados pessoais.", alternates: { canonical: "/politica-de-privacidade" } };

export default function PrivacyPage() {
  return <LegalPage eyebrow="Institucional" title="Política de Privacidade" intro="Esta política explica de forma clara quais dados podem ser coletados durante o uso do site e como a MK os utiliza e protege." sections={[
    { title: "Dados que podemos coletar", paragraphs: ["Podemos receber dados fornecidos diretamente por você ao preencher formulários, solicitar contato ou iniciar um diagnóstico."], items: ["Nome, e-mail e telefone", "Informações profissionais e sobre o condomínio", "Respostas fornecidas no diagnóstico", "Dados técnicos básicos de navegação"] },
    { title: "Como utilizamos os dados", paragraphs: ["Os dados são utilizados para responder solicitações, prestar informações sobre nossos serviços, gerar o resultado do diagnóstico e melhorar a experiência no site."], items: ["Entrar em contato quando solicitado", "Preparar avaliações e orientações", "Cumprir obrigações legais", "Prevenir fraudes e proteger o site"] },
    { title: "Compartilhamento", paragraphs: ["A MK não comercializa dados pessoais. Informações podem ser compartilhadas somente com fornecedores necessários à operação do site, mediante medidas de proteção, ou quando exigido por lei."] },
    { title: "Armazenamento e segurança", paragraphs: ["Adotamos medidas técnicas e administrativas razoáveis para proteger dados contra acesso não autorizado, perda ou alteração. Os dados são mantidos apenas pelo período necessário às finalidades informadas ou às obrigações legais."] },
    { title: "Seus direitos", paragraphs: ["Você pode solicitar confirmação do tratamento, acesso, correção, anonimização, eliminação ou portabilidade dos seus dados, quando aplicável."], items: ["Revogar consentimentos", "Saber com quem os dados foram compartilhados", "Solicitar revisão ou esclarecimentos sobre o tratamento"] },
    { title: "Cookies e alterações", paragraphs: ["O site pode utilizar cookies essenciais e ferramentas de medição para funcionamento e melhoria da experiência. Esta política poderá ser atualizada para refletir mudanças legais ou operacionais."] },
  ]} />;
}
