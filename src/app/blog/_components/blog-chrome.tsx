import Image from "next/image";
import Link from "next/link";

export function BlogHeader() {
  return (
    <header className="blog-header">
      <Link href="/" aria-label="MK Síndico Profissional — início">
        <Image src="/logo.webp" alt="MK Síndico Profissional" width={165} height={55} priority />
      </Link>
      <nav>
        <Link href="/#solucoes">Soluções</Link><Link href="/#metodo-mk">Método MK</Link>
        <Link href="/diagnostico">Diagnóstico</Link><Link href="/#sobre">Marcos Kowalewski</Link>
        <Link href="/blog">Conteúdo</Link><Link href="/#contato">Contato</Link>
      </nav>
      <Link className="button button-small" href="/diagnostico">Fazer diagnóstico</Link>
    </header>
  );
}

export function BlogFooter() {
  return (
    <footer className="blog-footer">
      <div className="wrap blog-footer-grid">
        <div><Image src="/logo.webp" alt="MK Síndico Profissional" width={155} height={52} /><p>Gestão condominial com experiência executiva, método e governança para proteger e valorizar o patrimônio.</p></div>
        <div><h3>Soluções</h3><Link href="/solucoes/sindico-profissional">Síndico Profissional</Link><Link href="/solucoes/consultoria-condominial">Consultoria Condominial</Link><Link href="/solucoes/implantacao-condominial">Implantação Condominial</Link><Link href="/solucoes/conselheiro-profissional">Conselheiro Profissional</Link></div>
        <div><h3>Conheça a MK</h3><Link href="/#sobre">Sobre a MK</Link><Link href="/#metodo-mk">Método MK</Link><Link href="/diagnostico">Diagnóstico</Link><Link href="/blog">Conteúdo</Link></div>
        <div><h3>Institucional</h3><Link href="/politica-de-privacidade">Política de Privacidade</Link><Link href="/termos-de-uso">Termos de Uso</Link><Link href="/lgpd">LGPD</Link></div>
      </div>
      <div className="wrap blog-copyright"><span>© 2026 MK Síndico Profissional.</span><span>Desenvolvido com estratégia, método e gestão.</span></div>
    </footer>
  );
}

