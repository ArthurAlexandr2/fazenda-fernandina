/* ============================================================
   LAYOUT RAIZ — app/layout.tsx

   Este arquivo é o "esqueleto" que envolve TODAS as páginas do site.
   Tudo que está aqui aparece em todas as páginas:
   - As fontes tipográficas
   - A Navbar (barra de navegação no topo)
   - O botão flutuante do WhatsApp
   - O Footer (rodapé)

   O "{children}" no meio é onde cada página é renderizada.
   ============================================================ */

import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

/* -------------------------------------------------------
   FONTES — carregadas via next/font (self-hosted automaticamente)
   next/font baixa as fontes do Google e serve do próprio servidor,
   evitando requests externos e melhorando a velocidade de carregamento.
   ------------------------------------------------------- */

/* Inter — fonte principal para textos, labels e botões */
const inter = Inter({
  variable: "--font-inter", // cria a variável CSS --font-inter
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap", // mostra texto imediatamente com fonte fallback enquanto carrega
});

/* Cormorant Garamond — fonte elegante serifada para títulos */
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant", // cria a variável CSS --font-cormorant
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"], // precisamos do itálico para "Fazenda" no logo
  display: "swap",
});

/* -------------------------------------------------------
   METADADOS — informações da página para o Google e redes sociais
   ------------------------------------------------------- */
export const metadata: Metadata = {
  title: {
    default: "Fazenda Fernandina — Criações de Alto Padrão",
    template: "%s | Fazenda Fernandina", // páginas internas usam: "Haras | Fazenda Fernandina"
  },
  description:
    "Fazenda Fernandina — criações selecionadas de cavalos, alpacas, mini cabras, mini porcos, coelhos e mini gado em Gravatá-PE.",
  keywords: [
    "Fazenda Fernandina",
    "Haras",
    "Mangalarga Marchador",
    "Alpacas",
    "Gravatá PE",
    "animais de alto padrão",
  ],
};

/* -------------------------------------------------------
   COMPONENTE DE LAYOUT
   ------------------------------------------------------- */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /* lang="pt-BR" informa ao navegador e ao Google que o site é em português
       As classes de variáveis das fontes aplicam --font-inter e --font-cormorant
       no elemento html, ficando disponíveis para o CSS em globals.css */
    <html
      lang="pt-BR"
      className={`${inter.variable} ${cormorant.variable} antialiased`}
    >
      <body className="bg-fundo min-h-screen flex flex-col">
        {/* Navbar fixa no topo — visível em todas as páginas */}
        <Navbar />

        {/* Conteúdo principal — ocupa o espaço restante da tela */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer — rodapé em todas as páginas */}
        <Footer />

        {/* Botão flutuante do WhatsApp — sempre visível no canto inferior direito */}
        <WhatsAppButton />
      </body>
    </html>
  );
}
