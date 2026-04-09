/* ============================================================
   HOME — página principal (/)

   Esta é a página que o usuário vê ao entrar no site.
   Estrutura (de cima para baixo):
     1. Hero         — foto dramática, logo, tagline, botões
     2. Quem Somos   — fundo claro/bege, texto da história
     3. Diferenciais — fundo escuro, 3 cards de vantagens
     4. Criações     — fundo escuro, grid 3x2 com as 6 criações
     5. Contato      — fundo escuro, 3 cards de contato + CTA

   É um Server Component — toda a renderização acontece no servidor,
   o HTML chega pronto para o navegador (melhor performance e SEO).
   ============================================================ */

import Image from "next/image";
import Link from "next/link";
import CriacaoCard from "@/components/CriacaoCard";
import { CRIACOES_MOCK } from "@/lib/data";
import { linkWhatsApp } from "@/lib/whatsapp";

/* -------------------------------------------------------
   SUBCOMPONENTES — pequenos blocos reutilizados nesta página
   ------------------------------------------------------- */

/* Separador decorativo centralizado — três elementos flex:
   linha esquerda · ponto central · linha direita, todos em dourado.
   justify-center garante a centralização horizontal em qualquer contexto. */
function Separador({ claro = false }: { claro?: boolean }) {
  return (
    <div className="flex items-center justify-center gap-2 my-6">
      {/* Linha esquerda — 64px de largura, 1px de altura */}
      <div className={`h-px w-16 ${claro ? "bg-dourado-texto" : "bg-dourado"}`} />
      {/* Ponto central — círculo de 6px */}
      <div className={`w-1.5 h-1.5 rounded-full ${claro ? "bg-dourado-texto" : "bg-dourado"}`} />
      {/* Linha direita */}
      <div className={`h-px w-16 ${claro ? "bg-dourado-texto" : "bg-dourado"}`} />
    </div>
  );
}

/* Label de seção — ex: "NOSSA HISTÓRIA" em dourado uppercase */
function LabelSecao({ children, claro = false }: { children: React.ReactNode; claro?: boolean }) {
  return (
    <span
      className={`font-sans text-xs font-semibold tracking-widest uppercase ${
        claro ? "text-dourado-texto" : "text-dourado"
      }`}
    >
      {children}
    </span>
  );
}

/* Ícone SVG do WhatsApp */
function IconeWhatsApp({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

/* -------------------------------------------------------
   PÁGINA PRINCIPAL
   ------------------------------------------------------- */
export default function Home() {
  return (
    <>
      {/* ================================================================
          SEÇÃO 1 — HERO
          Tela cheia com foto dramática, logo grande e chamadas para ação.
          ================================================================ */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* ---- FOTO DE FUNDO ----
            Nova foto: campo ao entardecer — tom rural e quente, mais fiel ao Figma.
            priority = carrega imediatamente (é o LCP — maior elemento visível da página)
            fill = expande para cobrir o container inteiro
            object-cover = mantém proporção sem distorcer a imagem */}
        <Image
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=80"
          alt="Fazenda Fernandina — campo ao entardecer"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />

        {/* ---- OVERLAY ÂMBAR ----
            Camada semitransparente âmbar sobre a foto (tom quente/sépia).
            mix-blend-multiply: mistura a cor com a foto de baixo em vez de
            apenas cobrir — cria um efeito de tonalização fotográfica mais rico,
            como um filtro de Instagram. */}
        <div className="absolute inset-0 bg-amber-900/40 mix-blend-multiply" />

        {/* ---- OVERLAY ESCURO ----
            Segunda camada de escurecimento para garantir legibilidade do texto.
            Vem depois do âmbar para aprofundar o contraste sem perder o tom quente. */}
        <div className="absolute inset-0 bg-black/50" />

        {/* ---- CONTEÚDO ---- z-10 garante que fique sobre os overlays */}
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          {/* ---- LOGO DO HERO ----
              Substituído o badge "FF" + textos pela logo real (public/logo-hero.png).
              A logo tem fundo preto na imagem — fica natural sobre o hero escuro. */}
          <div className="flex justify-center mb-8">
            <Image
              src="/logo-hero.png"
              alt="Fazenda Fernandina"
              width={300}
              height={195}
              className="object-contain"
              priority
            />
          </div>

          {/* ---- TAGLINE ----
              Quebrada em duas linhas com <br /> para fidelidade ao Figma.
              uppercase + tracking-widest = estilo de "subtítulo de luxo". */}
          <p className="font-sans text-white/80 text-xs sm:text-sm tracking-widest uppercase mb-10">
            TRADIÇÃO, EXCELÊNCIA E CUIDADO EM<br />CADA CRIAÇÃO
          </p>

          {/* ---- BOTÕES ----
              flex-col = empilhados verticalmente (um embaixo do outro)
              w-80 = largura fixa de 320px nos dois — alinhados e simétricos
              rounded-full = formato pílula moderno */}
          <div className="flex flex-col items-center gap-4">

            {/* Botão primário — fundo dourado */}
            <Link
              href="/#criacoes"
              className="flex items-center justify-center gap-2 w-80 bg-dourado hover:bg-dourado-hover text-texto-escuro font-sans font-semibold text-sm tracking-wider uppercase px-8 py-4 rounded-full transition-all duration-300"
            >
              Conheça nossas criações
              <span aria-hidden="true">→</span>
            </Link>

            {/* Botão secundário — fundo transparente com borda branca semiopaca.
                No hover: borda e texto viram dourados.
                Não usa bg-dourado/10 no hover para manter o look "fantasma" clean. */}
            <Link
              href="/#quem-somos"
              className="flex items-center justify-center gap-2 w-80 bg-transparent border border-white/70 hover:border-dourado text-white hover:text-dourado font-sans font-semibold text-sm tracking-wider uppercase px-8 py-4 rounded-full transition-all duration-300"
            >
              Saiba quem somos
              {/* Chevron ↓ com animate-bounce — sobe e desce em loop automaticamente.
                  O Tailwind já tem essa animação embutida, não precisa de CSS extra.
                  Aplicado só no ícone, não no texto, para o efeito ser sutil. */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-bounce"
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================
          SEÇÃO 2 — QUEM SOMOS
          Fundo bege/creme (#F5F0E8) — contraste claro entre seções escuras.
          id="quem-somos" = âncora para os links da navbar e do hero funcionarem.
          ================================================================ */}
      <section id="quem-somos" className="bg-fundo-claro py-20 px-6">
        {/* max-w-[700px] limita a largura do texto para ~70 caracteres por linha,
            o ideal para leitura confortável. mx-auto centraliza o bloco. */}
        <div className="max-w-[700px] mx-auto">

          {/* ---- LABEL SUPERIOR ----
              "NOSSA HISTÓRIA" em dourado, uppercase, letra pequena com espaçamento largo.
              tracking-[0.15em] = 0.15em de espaço entre cada letra */}
          <p className="text-center font-sans text-xs font-semibold uppercase tracking-[0.15em] text-dourado mb-3">
            Nossa História
          </p>

          {/* ---- TÍTULO ----
              Cormorant Garamond 700, ~56px, cor escura (#1A1A1A).
              "Quem Somos" — capitalizado, não uppercase. */}
          <h2 className="text-center font-display font-bold text-texto-escuro text-5xl sm:text-[56px] leading-tight mb-4">
            Quem Somos
          </h2>

          {/* ---- SEPARADOR DECORATIVO ----
              Linha · ponto · linha — tudo em dourado, centralizado.
              gap-2 = 8px entre os elementos.
              mb-10 = 40px de margem antes do texto. */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {/* Linha esquerda — 60px de largura, 1.5px de altura */}
            <div className="h-[1.5px] w-[60px] bg-dourado" />
            {/* Ponto central — círculo de 5px */}
            <div className="w-[5px] h-[5px] rounded-full bg-dourado" />
            {/* Linha direita */}
            <div className="h-[1.5px] w-[60px] bg-dourado" />
          </div>

          {/* ---- TEXTO CORRIDO ----
              Inter 400, 16px, cor #3D3D3D (cinza escuro — mais suave que preto puro).
              leading-[1.75] = 1.75 de line-height para conforto de leitura.
              space-y-5 = 20px de espaço entre cada parágrafo. */}
          <div className="space-y-5 font-sans text-base leading-[1.75]" style={{ color: '#3D3D3D' }}>

            {/* Parágrafo 1 — "Fazenda Fernandina" em negrito */}
            <p>
              <strong className="font-semibold" style={{ color: '#1A1A1A' }}>Fazenda Fernandina</strong>{" "}
              é mais que um negócio rural — é o resultado de gerações dedicadas ao cuidado genuíno
              e ao amor pelos animais. Nascida da paixão de uma família pelo campo, tornou-se
              referência em criações especializadas.
            </p>

            {/* Parágrafo 2 — tradição e excelência */}
            <p>
              Tradição e excelência caminham juntas na construção de um ecossistema rural único,
              onde cada detalhe é pensado para o bem-estar animal e para a satisfação de quem
              nos escolhe.
            </p>

            {/* Parágrafo 3 — nomes das criações em negrito
                ATENÇÃO: o Figma usava "Canil Ursos da Colina" — corrigido para
                "Mini Gado Fernandina", que é a criação atual da fazenda. */}
            <p>
              Nosso trabalho integra o{" "}
              <strong className="font-semibold" style={{ color: '#1A1A1A' }}>Haras Fernandina</strong>, o{" "}
              <strong className="font-semibold" style={{ color: '#1A1A1A' }}>Alpacas dos Andes</strong>, o{" "}
              <strong className="font-semibold" style={{ color: '#1A1A1A' }}>Mini Cabras dos Alpes</strong>, o{" "}
              <strong className="font-semibold" style={{ color: '#1A1A1A' }}>Mini-Porcos da Serra</strong>, o{" "}
              <strong className="font-semibold" style={{ color: '#1A1A1A' }}>Coelhos da Montanha</strong> e o{" "}
              <strong className="font-semibold" style={{ color: '#1A1A1A' }}>Mini Gado Fernandina</strong>,
              reunindo criações selecionadas com alto padrão de cuidado.
            </p>

            {/* Parágrafo 4 — bem-estar animal */}
            <p>
              Cada animal recebe atenção individualizada, nutrição balanceada e um ambiente que
              respeita suas necessidades naturais, promovendo saúde, bem-estar e desenvolvimento pleno.
            </p>
          </div>

          {/* ---- BLOCKQUOTE / CITAÇÃO ----
              Borda esquerda dourada (3px) com padding esquerdo — estilo de citação editorial.
              mt-6 = 24px de distância após o último parágrafo. */}
          <blockquote className="mt-6 pl-4 border-l-[3px] border-dourado">
            {/* Inter 700 (bold), uppercase, letter-spacing largo — tom moderno e marcante.
                A frase deixa de ser uma citação suave e vira uma declaração de identidade.
                tracking-wide + uppercase + peso máximo criam impacto visual imediato. */}
            <p className="font-sans font-bold text-[13px] uppercase tracking-[0.18em] leading-relaxed" style={{ color: '#1A1A1A' }}>
              "Um legado de cuidado, excelência e respeito à vida animal."
            </p>
          </blockquote>

          {/* ---- BOTÃO "CONHEÇA NOSSAS CRIAÇÕES" ----
              Fundo escuro (#1A1A1A) — diferente do hero que usa dourado.
              Centralizado com flex + justify-center no wrapper.
              mt-8 = 32px de distância após o blockquote. */}
          <div className="flex justify-center mt-8">
            <Link
              href="/#criacoes"
              className="flex items-center gap-3 bg-texto-escuro hover:bg-black text-white font-sans font-semibold text-sm tracking-wider uppercase px-8 py-4 rounded-lg transition-colors duration-200"
            >
              Conheça nossas criações
              {/* Seta → à direita */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
                aria-hidden="true"
              >
                <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

        </div>
      </section>

      {/* ================================================================
          SEÇÃO 3 — O QUE NOS TORNA ESPECIAIS
          Fundo escuro — 3 cards com ícone, título e descrição.
          ================================================================ */}
      <section className="bg-fundo py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Cabeçalho da seção — centralizado */}
          <div className="text-center mb-14">
            <LabelSecao>Por que nos escolher</LabelSecao>
            <h2 className="font-display font-bold text-white text-4xl sm:text-5xl mt-3 leading-tight">
              O Que Nos Torna Especiais
            </h2>
            <Separador />
          </div>

          {/* Grid de 3 cards — 1 coluna no mobile, 3 no desktop */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 — Criações Selecionadas */}
            <div className="bg-fundo-card border border-borda rounded-xl p-8 flex flex-col items-start gap-5">
              {/* Ícone troféu em círculo dourado semitransparente */}
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-dourado/15">
                <svg viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth={1.5} className="w-7 h-7" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                </svg>
              </div>

              <div>
                <h3 className="font-display font-bold text-white text-2xl mb-2">
                  Criações Selecionadas
                </h3>
                <p className="font-sans text-texto-secundario text-sm leading-relaxed">
                  Animais de alta qualidade genética com bem-estar e saúde garantidos em cada
                  etapa da criação.
                </p>
              </div>
            </div>

            {/* Card 2 — Atendimento Especializado */}
            <div className="bg-fundo-card border border-borda rounded-xl p-8 flex flex-col items-start gap-5">
              {/* Ícone coração */}
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-dourado/15">
                <svg viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth={1.5} className="w-7 h-7" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
              </div>

              <div>
                <h3 className="font-display font-bold text-white text-2xl mb-2">
                  Atendimento Especializado
                </h3>
                <p className="font-sans text-texto-secundario text-sm leading-relaxed">
                  Suporte completo antes, durante e após a aquisição do seu animal, com
                  acompanhamento contínuo.
                </p>
              </div>
            </div>

            {/* Card 3 — Tradição Familiar */}
            <div className="bg-fundo-card border border-borda rounded-xl p-8 flex flex-col items-start gap-5">
              {/* Ícone família/pessoas */}
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-dourado/15">
                <svg viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth={1.5} className="w-7 h-7" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                </svg>
              </div>

              <div>
                <h3 className="font-display font-bold text-white text-2xl mb-2">
                  Tradição Familiar
                </h3>
                <p className="font-sans text-texto-secundario text-sm leading-relaxed">
                  Gerações dedicadas ao cuidado, ao amor e ao respeito incondicional pelos
                  animais.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SEÇÃO 4 — NOSSAS CRIAÇÕES
          Grid 3x2 com os cards de cada criação.
          id="criacoes" = âncora para o link da navbar.
          ================================================================ */}
      <section id="criacoes" className="bg-fundo py-20 px-4 border-t border-borda">
        <div className="max-w-6xl mx-auto">
          {/* Cabeçalho da seção */}
          <div className="text-center mb-14">
            <LabelSecao>Explore</LabelSecao>
            <h2 className="font-display font-bold text-white text-4xl sm:text-5xl mt-3 leading-tight">
              Nossas Criações
            </h2>
            <Separador />
            <p className="font-sans text-texto-secundario text-sm mt-2">
              Toque em uma categoria para conhecer nossos animais
            </p>
          </div>

          {/* Grid de cards — 1 col mobile, 2 col tablet, 3 col desktop
              Os dados vêm do arquivo lib/data.ts (CRIACOES_MOCK)
              Na Fase 3, virão do banco de dados Supabase */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CRIACOES_MOCK.map((criacao) => (
              /* Cada card recebe os dados da criação como "prop" */
              <CriacaoCard key={criacao.id} criacao={criacao} />
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          SEÇÃO 5 — FALE CONOSCO
          3 cards informativos + botão grande de WhatsApp.
          id="contato" = âncora para o link da navbar.
          ================================================================ */}
      <section id="contato" className="bg-fundo py-20 px-4 border-t border-borda">
        <div className="max-w-5xl mx-auto">
          {/* Cabeçalho da seção */}
          <div className="text-center mb-14">
            <LabelSecao>Contato</LabelSecao>
            <h2 className="font-display font-bold text-white text-4xl sm:text-5xl mt-3 leading-tight">
              Fale Conosco
            </h2>
            <Separador />
            <p className="font-sans text-texto-secundario text-sm mt-2 max-w-lg mx-auto leading-relaxed">
              Interessado em algum animal ou com dúvidas sobre nossas criações? Entre em contato
              pelo WhatsApp — respondemos de segunda a sábado.
            </p>
          </div>

          {/* Grid de 3 cards informativos */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
            {/* Card 1 — Localização */}
            <div className="bg-fundo-card border border-borda rounded-xl p-6 flex flex-col gap-3">
              {/* Ícone pin de localização */}
              <div className="text-dourado">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
              </div>

              <div>
                <span className="font-sans text-dourado-texto text-xs font-semibold tracking-widest uppercase">
                  Localização
                </span>
                <p className="font-sans text-white text-sm mt-1 font-medium">
                  Zona Rural — Gravatá-PE, Brasil
                </p>
                <p className="font-sans text-texto-secundario text-xs mt-1">
                  Visitas podem ser agendadas previamente.
                </p>
              </div>
            </div>

            {/* Card 2 — Canais de contato */}
            <div className="bg-fundo-card border border-borda rounded-xl p-6 flex flex-col gap-3">
              {/* Ícone balão de conversa */}
              <div className="text-dourado">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                </svg>
              </div>

              <div>
                <span className="font-sans text-dourado-texto text-xs font-semibold tracking-widest uppercase">
                  Contato
                </span>

                {/* Link WhatsApp */}
                <a
                  href={linkWhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 mt-2 group"
                >
                  <span className="text-whatsapp">
                    <IconeWhatsApp className="w-4 h-4" />
                  </span>
                  <span className="font-sans text-white text-sm font-medium group-hover:text-whatsapp transition-colors">
                    WhatsApp
                  </span>
                </a>

                {/* Link E-mail */}
                <a
                  href="mailto:contato@fazendafernandina.com.br"
                  className="flex items-center gap-2 mt-1.5 group"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 text-texto-secundario" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                  <span className="font-sans text-white text-sm font-medium group-hover:text-dourado transition-colors">
                    E-mail
                  </span>
                </a>
              </div>
            </div>

            {/* Card 3 — Horário de Atendimento */}
            <div className="bg-fundo-card border border-borda rounded-xl p-6 flex flex-col gap-3">
              {/* Ícone relógio */}
              <div className="text-dourado">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>

              <div>
                <span className="font-sans text-dourado-texto text-xs font-semibold tracking-widest uppercase">
                  Atendimento
                </span>
                <p className="font-sans text-white text-sm mt-1 font-medium">
                  Segunda a Sábado
                </p>
                <p className="font-sans text-texto-secundario text-xs mt-0.5">
                  08:00 – 18:00
                </p>
              </div>
            </div>
          </div>

          {/* ---- BOTÃO CTA PRINCIPAL — WhatsApp ----
              Botão grande verde que ocupa a largura total no mobile */}
          <a
            href={linkWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full bg-whatsapp hover:bg-whatsapp-hover text-white font-sans font-semibold text-base tracking-wider uppercase py-5 rounded-xl transition-colors duration-200"
          >
            <IconeWhatsApp className="w-5 h-5" />
            Falar no WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
