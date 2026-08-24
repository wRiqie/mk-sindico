import type { Metadata } from "next";
import { Manrope, Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const deploymentHost =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.VERCEL_PROJECT_PRODUCTION_URL ??
  process.env.VERCEL_URL ??
  "mksindico.com.br";
const siteUrl = deploymentHost.startsWith("http")
  ? deploymentHost
  : `https://${deploymentHost}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MK Síndico Profissional | Gestão Condominial com Método",
    template: "%s | MK Síndico Profissional",
  },
  description:
    "Síndico profissional e gestão condominial com experiência executiva, governança e método para mais controle, previsibilidade e valorização do patrimônio.",
  keywords: [
    "síndico profissional",
    "gestão condominial",
    "governança condominial",
    "consultoria condominial",
    "São Paulo",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "MK Síndico Profissional | Gestão Condominial com Método",
    description: "Gestão condominial não deve ser improviso. Deve ser método.",
    url: "/",
    siteName: "MK Síndico Profissional",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "MK Síndico Profissional | Gestão Condominial com Método",
    description: "Gestão condominial não deve ser improviso. Deve ser método.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth">
      <body className={`${montserrat.variable} ${manrope.variable}`}>
        {children}
      </body>
    </html>
  );
}
