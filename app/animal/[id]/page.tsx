/* ============================================================
   PÁGINA DE DETALHE DO ANIMAL — app/animal/[id]/page.tsx

   Página dinâmica: um único arquivo serve todos os animais.
   O Next.js extrai o [id] da URL automaticamente.

   IMPORTANTE — Next.js 16: params é uma Promise e deve ser aguardado.

   É um Server Component — toda a renderização acontece no servidor.
   Não precisa de JavaScript no cliente pois não há interatividade.
   ============================================================ */

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ANIMAIS_MOCK, CRIACOES_MOCK } from "@/lib/data";
import { linkWhatsAppAnimal } from "@/lib/whatsapp";
import type { Animal } from "@/lib/types";

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
   Ícone do WhatsApp para o CTA fixo no rodapé
   ------------------------------------------------------- */
function IconeWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

/* -------------------------------------------------------
   Badge de status no hero — ponto colorido + texto
   ------------------------------------------------------- */
function StatusBadgeHero({ status }: { status: Animal["status"] }) {
  const config = {
    disponivel: { cor: "bg-disponivel", texto: "Disponível" },
    reservado:  { cor: "bg-reservado",  texto: "Reservado"  },
    reproducao: { cor: "bg-reproducao", texto: "Reprodução" },
  };
  const { cor, texto } = config[status];

  return (
    /* Fundo escuro semitransparente — legível sobre qualquer foto */
    <span className="flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
      <span className={`w-2 h-2 rounded-full ${cor}`} />
      <span className="font-sans text-white text-xs font-medium">{texto}</span>
    </span>
  );
}

/* -------------------------------------------------------
   Campo da ficha técnica — label + valor
   ------------------------------------------------------- */
function CampoFicha({
  label,
  valor,
  destaque = false,
}: {
  label: string;
  valor: string;
  destaque?: boolean; /* destaque=true = borda dourada (para genealogia) */
}) {
  return (
    <div
      className={`bg-fundo-card rounded-xl p-3 border ${
        destaque ? "border-dourado/40" : "border-white/10"
      }`}
    >
      {/* Label do campo — dourado, uppercase, letra minúscula */}
      <p className="font-sans text-[10px] uppercase tracking-widest text-dourado mb-1">
        {label}
      </p>
      {/* Valor — branco, médio weight */}
      <p
        className={`font-sans text-sm font-medium ${
          destaque ? "text-dourado" : "text-white"
        }`}
      >
        {valor}
      </p>
    </div>
  );
}

/* -------------------------------------------------------
   PÁGINA — componente assíncrono (Server Component)
   ------------------------------------------------------- */
export default async function PaginaAnimal({
  params,
}: {
  /* NEXT.JS 16: params é uma Promise — obrigatório usar await */
  params: Promise<{ id: string }>;
}) {
  /* Aguarda a Promise para obter o id do animal */
  const { id } = await params;

  /* Busca o animal pelo id nos dados mockados
     Na Fase 3: virá do Supabase com getAnimalById(id) */
  const animal = ANIMAIS_MOCK.find((a) => a.id === id);

  if (!animal) {
    notFound();
  }

  /* Busca os dados da criação pai (para breadcrumb e botão voltar) */
  const criacao = CRIACOES_MOCK.find((c) => c.id === animal.criacao_id);

  /* Foto principal do animal (ou null se não houver nenhuma) */
  const fotoPrincipal =
    animal.fotos_animais.find((f) => f.principal)?.url ??
    animal.fotos_animais[0]?.url ??
    null;

  /* Monta a metadata: "5 meses · Fêmea · Mangalarga" */
  const metadata = [animal.idade, animal.sexo, animal.raca]
    .filter(Boolean)
    .join(" · ");

  /* Link do WhatsApp com mensagem pré-preenchida com o nome do animal */
  const linkWpp = linkWhatsAppAnimal(animal.nome);

  /* Texto do status em português para o badge */
  const statusTexto = {
    disponivel: "Disponível",
    reservado:  "Reservado",
    reproducao: "Reprodução",
  }[animal.status];

  return (
    /* pb-20 garante que o conteúdo não fique escondido
       atrás do CTA fixo no rodapé (altura ~64px) */
    <div className="pb-20">

      {/* ================================================================
          1. HERO DO ANIMAL
          Foto grande com overlay + nome + metadata + badge de status
          ================================================================ */}
      <section className="relative h-[50vh] overflow-hidden">
        {fotoPrincipal ? (
          <Image
            src={fotoPrincipal}
            alt={animal.nome}
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        ) : (
          /* Fallback: fundo escuro com degradê quando não há foto */
          <div className="absolute inset-0 bg-gradient-to-b from-fundo-card to-fundo" />
        )}

        {/* Overlay gradiente na base para legibilidade do texto */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/80" />

        {/* Botão voltar ← — leva de volta à página da criação */}
        <div className="absolute top-0 left-0 p-4 mt-24">
          <Link
            href={criacao ? `/categoria/${criacao.slug}` : "/#criacoes"}
            aria-label="Voltar para a criação"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors duration-200"
          >
            <IconeVoltar />
          </Link>
        </div>

        {/* Conteúdo na base do hero */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 max-w-3xl mx-auto">
          {/* Nome do animal — fonte elegante grande */}
          <h1 className="font-display font-bold text-white text-4xl sm:text-5xl leading-tight mb-1">
            {animal.nome}
          </h1>

          {/* Metadata: idade · sexo · raça */}
          {metadata && (
            <p className="font-sans text-white/70 text-sm mb-3">
              {metadata}
            </p>
          )}
        </div>

        {/* Badge de status — canto inferior direito */}
        <div className="absolute bottom-6 right-6">
          <StatusBadgeHero status={animal.status} />
        </div>
      </section>

      {/* ================================================================
          2. BREADCRUMB
          Nome da criação + linha decorativa
          ================================================================ */}
      <section className="bg-fundo px-6 pt-6 pb-4 max-w-3xl mx-auto">
        <p className="font-sans text-dourado text-xs font-semibold tracking-widest uppercase">
          {criacao?.nome ?? "Fazenda Fernandina"} · Fazenda Fernandina
        </p>
        {/* Linha decorativa dourada */}
        <div className="w-10 h-0.5 bg-dourado mt-2" />
      </section>

      {/* ================================================================
          3. DESCRIÇÃO DO ANIMAL
          Texto individual do animal
          ================================================================ */}
      {animal.descricao && (
        <section className="bg-fundo px-6 pb-8 max-w-3xl mx-auto">
          <p className="font-sans text-texto-secundario text-base leading-relaxed">
            {animal.descricao}
          </p>
        </section>
      )}

      {/* ================================================================
          4. FICHA TÉCNICA
          Grid de campos com label dourado e valor branco
          ================================================================ */}
      <section className="bg-fundo px-6 pb-10 max-w-3xl mx-auto">
        {/* Label da seção */}
        <p className="font-sans text-xs font-semibold uppercase tracking-widest text-dourado mb-4">
          Características · Ficha Técnica
        </p>

        {/* Grid de campos — 2 colunas */}
        <div className="grid grid-cols-2 gap-3">

          {/* Campos universais — aparecem em todos os animais */}
          {animal.raca     && <CampoFicha label="Raça"    valor={animal.raca}    />}
          {animal.idade    && <CampoFicha label="Idade"   valor={animal.idade}   />}
          {animal.sexo     && <CampoFicha label="Sexo"    valor={animal.sexo}    />}
                              <CampoFicha label="Grupo"   valor={animal.grupo}   />
          {animal.pelagem  && <CampoFicha label="Pelagem" valor={animal.pelagem} />}
                              <CampoFicha label="Status"  valor={statusTexto}    />

          {/* Campos exclusivos de cavalos — só aparecem se preenchidos */}
          {animal.andamento && (
            <CampoFicha label="Andamento" valor={animal.andamento} />
          )}

          {/* Genealogia — campo especial com borda e texto dourados */}
          {(animal.genealogia_pai || animal.genealogia_mae) && (
            <div className="col-span-2">
              <CampoFicha
                label="Genealogia"
                valor={[
                  animal.genealogia_pai  ? `Pai: ${animal.genealogia_pai}`  : null,
                  animal.genealogia_mae ? `Mãe: ${animal.genealogia_mae}` : null,
                ]
                  .filter(Boolean)
                  .join("  ·  ")}
                destaque
              />
            </div>
          )}
        </div>
      </section>

      {/* ================================================================
          5. CTA FIXO NO RODAPÉ
          Barra verde do WhatsApp — sempre visível na base da tela
          ================================================================ */}
      <a
        href={linkWpp}
        target="_blank"
        rel="noopener noreferrer"
        /* fixed bottom-0 = grudado na base da tela, largura total
           py-4 = padding confortável para toque no celular */
        className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center gap-3 bg-whatsapp hover:bg-whatsapp-hover text-white font-sans font-semibold text-base py-4 transition-colors duration-200"
      >
        <IconeWhatsApp />
        Falar sobre este animal
      </a>

    </div>
  );
}
