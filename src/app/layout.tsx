import type { Metadata } from "next";
import { Montserrat, Manrope } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://mksindico.com.br"),
  title: { default: "MK Síndico Profissional | Gestão Condominial com Método", template: "%s | MK Síndico Profissional" },
  description: "Síndico profissional e gestão condominial com experiência executiva, governança e método para mais controle, previsibilidade e valorização do patrimônio.",
  keywords: ["síndico profissional", "gestão condominial", "governança condominial", "consultoria condominial", "São Paulo"],
  alternates: { canonical: "/" },
  openGraph: { title: "MK Síndico Profissional", description: "Gestão condominial não deve ser improviso. Deve ser método.", type: "website", locale: "pt_BR", images: [{ url: "/hero.webp", width: 1983, height: 793, alt: "MK Síndico Profissional" }] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR">
      <body className={`${montserrat.variable} ${manrope.variable}`}>{children}</body>
    </html>
  );
}
