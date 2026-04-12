/* ============================================================
   PÁGINA DE CRIAÇÃO — app/categoria/[slug]/page.tsx

   Página dinâmica: um único arquivo serve todas as 6 criações.
   O Next.js extrai o [slug] da URL automaticamente.

   IMPORTANTE — Next.js 16: params é uma Promise e deve ser aguardado
   com "await" antes de acessar os valores.

   Esta página é um Server Component (sem 'use client'):
   - Busca os dados no servidor
   - Renderiza hero, descrição e instagram sem JavaScript no cliente
   - Passa os animais para o componente <ListagemFiltrada> (client)
     que cuida dos filtros e da busca interativa
   ============================================================ */

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ListagemFiltrada from "./ListagemFiltrada";
import { CRIACOES_MOCK, ANIMAIS_MOCK, DESCRICAO_CRIACAO, INSTAGRAM_INFO } from "@/lib/data";
import { linkWhatsAppEquipe } from "@/lib/whatsapp";

/* -------------------------------------------------------
   Ícone de seta para o botão "voltar"
   ------------------------------------------------------- */
function IconeVoltar() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      className="w-5 h-5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>
  );
}

/* -------------------------------------------------------
   Ícone do Instagram — SVG com gradiente rosa/roxo
   ------------------------------------------------------- */
function IconeInstagram() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
      <defs>
        <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#f09433" />
          <stop offset="25%"  stopColor="#e6683c" />
          <stop offset="50%"  stopColor="#dc2743" />
          <stop offset="75%"  stopColor="#cc2366" />
          <stop offset="100%" stopColor="#bc1888" />
        </linearGradient>
      </defs>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"
        fill="none" stroke="url(#ig-grad)" strokeWidth="2" />
      <circle cx="12" cy="12" r="4"
        fill="none" stroke="url(#ig-grad)" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="url(#ig-grad)" />
    </svg>
  );
}

/* -------------------------------------------------------
   Ícone do WhatsApp para o botão flutuante
   ------------------------------------------------------- */
function IconeWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

/* -------------------------------------------------------
   PÁGINA — componente assíncrono (Server Component)
   "async" permite usar "await" para buscar dados
   ------------------------------------------------------- */
export default async function PaginaCriacao({
  params,
}: {
  /* NEXT.JS 16: params é uma Promise — obrigatório usar await */
  params: Promise<{ slug: string }>;
}) {
  /* Aguarda a resolução da Promise para obter o slug da URL */
  const { slug } = await params;

  /* Busca a criação pelo slug nos dados mockados
     Na Fase 3, isso virá do Supabase: getCriacaoBySlug(slug) */
  const criacao = CRIACOES_MOCK.find((c) => c.slug === slug);

  /* Se não encontrou a criação, exibe página 404 do Next.js */
  if (!criacao) {
    notFound();
  }

  /* Filtra os animais que pertencem a esta criação e estão ativos */
  const animais = ANIMAIS_MOCK.filter(
    (a) => a.criacao_id === criacao.id && a.ativo
  );

  /* Dados de descrição e Instagram para esta criação */
  const descricao = DESCRICAO_CRIACAO[slug];
  const instagram  = INSTAGRAM_INFO[slug];

  /* Foto de fundo do hero */
  const fotoHero =
    criacao.foto_hero ||
    "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200";

  /* Link do WhatsApp com mensagem pré-preenchida com o nome da criação */
  const linkWpp = linkWhatsAppEquipe(criacao.nome);

  return (
    /* pb-32 garante que o conteúdo não fique atrás do botão flutuante fixo no rodapé */
    <div className="pb-32">

      {/* ================================================================
          1. HERO DA CRIAÇÃO
          Foto de fundo com gradiente + informações na base
          ================================================================ */}
      {/* bg-[#0D0D0D] = fundo preto como fallback enquanto a imagem carrega
          e também como cor de fundo para logos com transparência */}
      <section className="relative h-[60vh] overflow-hidden bg-[#0D0D0D]">
        {/* Foto/logo de fundo */}
        <Image
          src={fotoHero}
          alt={criacao.nome}
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />

        {/* Overlay gradiente — cavalos usa overlay mais suave para não escurecer
            o logo do Haras Fernandina; demais criações usam gradiente mais intenso */}
        <div className={`absolute inset-0 bg-gradient-to-b ${
          slug === "cavalos"
            ? "from-black/30 via-black/20 to-black/80"
            : "from-transparent via-black/20 to-black/80"
        }`} />

        {/* ---- BOTÃO VOLTAR ← ---- canto superior esquerdo
            mt-24 = 96px para não sobrepor a navbar fixa (80px) */}
        <div className="absolute top-0 left-0 p-4 mt-24">
          <Link
            href="/#criacoes"
            aria-label="Voltar para a home"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors duration-200"
          >
            <IconeVoltar />
          </Link>
        </div>

        {/* ---- CONTEÚDO NA BASE DO HERO ---- */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 max-w-5xl mx-auto">
          {/* Breadcrumb: "CAVALOS · FAZENDA FERNANDINA" */}
          <p className="font-sans text-dourado text-xs font-semibold tracking-widest uppercase mb-2">
            {criacao.categoria} · Fazenda Fernandina
          </p>

          {/* Nome da criação */}
          <h1 className="font-display font-bold text-white text-4xl sm:text-5xl leading-tight mb-2">
            {criacao.nome}
          </h1>

          {/* Tagline */}
          {criacao.tagline && (
            <p className="font-sans text-white/70 text-base">
              {criacao.tagline}
            </p>
          )}

          {/* Linha decorativa dourada */}
          <div className="w-10 h-0.5 bg-dourado mt-3" />
        </div>
      </section>

      {/* ================================================================
          2. BLOCO DE DESCRIÇÃO
          Texto com borda esquerda dourada — estilo editorial
          ================================================================ */}
      {descricao && (
        <section className="bg-fundo py-8 px-6">
          <div className="max-w-3xl mx-auto">
            {/* border-l-[3px] border-dourado = borda esquerda dourada de 3px
                pl-4 = recuo do texto em relação à borda */}
            <div className="border-l-[3px] border-dourado pl-4">
              <p className="font-sans text-texto-secundario text-sm leading-relaxed">
                {descricao}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ================================================================
          3. INSTAGRAM DA CRIAÇÃO
          Linha com handle do Instagram + botão para abrir o perfil
          ================================================================ */}
      {instagram && (
        <section className="bg-fundo border-t border-borda px-6 py-5">
          <div className="max-w-5xl mx-auto flex items-center justify-between gap-4 flex-wrap">
            {/* Lado esquerdo: ícone + handle + subtítulo */}
            <div className="flex items-center gap-3">
              <IconeInstagram />
              <div>
                <p className="font-sans font-semibold text-white text-sm">
                  {instagram.handle}
                </p>
                <p className="font-sans text-texto-secundario text-xs">
                  {instagram.subtitulo}
                </p>
              </div>
            </div>

            {/* Lado direito: botão "VER PERFIL" com gradiente Instagram */}
            <a
              href={instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans font-semibold text-white text-xs tracking-wider uppercase px-5 py-2.5 rounded-full transition-opacity duration-200 hover:opacity-90"
              style={{
                /* Gradiente oficial das cores do Instagram */
                background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
              }}
            >
              Ver Perfil
            </a>
          </div>
        </section>
      )}

      {/* ================================================================
          4 e 5. BUSCA + FILTROS + LISTAGEM AGRUPADA
          Se não há animais cadastrados, exibe painel "Em breve".
          Caso contrário, renderiza o componente interativo de listagem.
          ================================================================ */}
      <section className="bg-fundo border-t border-borda pt-8">
        {animais.length === 0 ? (
          /* ---- PAINEL EM BREVE ----
             Exibido quando a criação ainda não tem animais cadastrados. */
          <div className="max-w-xl mx-auto px-6 py-24 flex flex-col items-center text-center">

            {/* Ícone decorativo — círculo dourado com reticências */}
            <div className="flex items-center justify-center w-16 h-16 rounded-full border border-dourado/40 mb-8">
              <span className="text-dourado text-2xl tracking-widest leading-none">···</span>
            </div>

            {/* Título */}
            <h2 className="font-display font-bold text-white text-4xl mb-4">
              Em Breve
            </h2>

            {/* Linha dourada */}
            <div className="w-10 h-0.5 bg-dourado mb-6" />

            {/* Texto */}
            <p className="font-sans text-texto-secundario text-sm leading-relaxed mb-2">
              Estamos finalizando a seleção dos primeiros animais desta criação.
            </p>
            <p className="font-sans text-texto-secundario text-sm leading-relaxed mb-10">
              Em breve novidades por aqui — acompanhe nosso Instagram ou entre em contato para ser avisado em primeira mão.
            </p>

            {/* CTA WhatsApp */}
            <a
              href={linkWpp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sans font-semibold text-sm text-texto-escuro bg-dourado hover:bg-dourado/90 px-6 py-3 rounded-full transition-colors duration-200"
            >
              Quero ser avisado
            </a>

          </div>
        ) : (
          <ListagemFiltrada animais={animais} slug={slug} />
        )}
      </section>

      {/* ================================================================
          7. BOTÃO FLUTUANTE "FALAR COM A EQUIPE"
          Position fixed — sempre visível no canto inferior direito.
          ================================================================ */}
      <a
        href={linkWpp}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 flex flex-col items-center justify-center gap-0.5 bg-whatsapp hover:bg-whatsapp-hover text-white px-5 py-3 rounded-full shadow-lg hover:scale-105 transition-all duration-200"
      >
        <span className="flex items-center gap-2 font-sans font-semibold text-sm">
          <IconeWhatsApp />
          Falar com a equipe
        </span>
        {/* Horário de atendimento — texto menor abaixo */}
        <span className="font-sans text-white/80 text-[10px] tracking-wide">
          Seg–Sáb · 08h–18h
        </span>
      </a>

    </div>
  );
}
