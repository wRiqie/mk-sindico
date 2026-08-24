import Image from "next/image";
import Link from "next/link";

export type LegalSection = { title: string; paragraphs: string[]; items?: string[] };

export function LegalPage({ eyebrow, title, intro, sections }: { eyebrow: string; title: string; intro: string; sections: LegalSection[] }) {
  return <main className="legal-page">
    <header className="legal-header"><Link href="/" aria-label="MK Síndico Profissional — página inicial"><Image src="/logo.webp" alt="MK Síndico Profissional" width={155} height={52} priority /></Link><Link href="/">Voltar ao site</Link></header>
    <section className="legal-hero"><div className="wrap"><span>{eyebrow}</span><h1>{title}</h1><p>{intro}</p><small>Última atualização: 24 de agosto de 2026</small></div></section>
    <div className="wrap legal-layout">
      <aside><strong>Nesta página</strong>{sections.map((section, index) => <a href={`#secao-${index + 1}`} key={section.title}>{section.title}</a>)}</aside>
      <article>{sections.map((section, index) => <section id={`secao-${index + 1}`} key={section.title}><h2>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.items && <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}</section>)}</article>
    </div>
    <section className="legal-contact"><div className="wrap"><div><span>Dúvidas sobre este documento?</span><h2>Entre em contato com a MK.</h2></div><a className="button" href="mailto:contato@mksindico.com.br">contato@mksindico.com.br</a></div></section>
    <footer className="legal-footer"><div className="wrap"><span>© 2026 MK Síndico Profissional</span><nav><Link href="/politica-de-privacidade">Privacidade</Link><Link href="/termos-de-uso">Termos de uso</Link><Link href="/lgpd">LGPD</Link></nav></div></footer>
  </main>;
}
