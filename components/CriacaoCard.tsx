/* ============================================================
   CRIAÇÃOCARD — Card de criação no grid da home

   Layout em duas partes separadas (sem texto sobre a foto):

   ┌─────────────────────────┐
   │         FOTO            │  ← h-48, object-cover, fundo limpo
   ├─────────────────────────┤
   │ CATEGORIA  HARAS  [→]   │  ← rodapé sólido #1A1A1A
   │ Nome da criação         │
   │ Descrição em 2 linhas   │
   └─────────────────────────┘

   Vantagem: legibilidade perfeita em qualquer foto/logo.
   ============================================================ */

import Image from "next/image";
import Link from "next/link";
import type { Criacao } from "@/lib/types";

/* Ícone de seta → para o botão dourado do rodapé */
function IconeSeta() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
      className="w-4 h-4" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

interface CriacaoCardProps {
  criacao: Criacao;
}

export default function CriacaoCard({ criacao }: CriacaoCardProps) {
  const fotoUrl =
    criacao.foto_hero ||
    "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800";

  /* Fundo por slug — aplicado via style inline (classes dinâmicas não são
     detectadas pelo Tailwind em build). Todas usam object-cover + center. */
  const bgColor: Record<string, string> = {
    cavalos:      "#000000",
    alpacas:      "#000000",
    "mini-cabras": "#7a0c0c",
    "mini-porcos": "#f0ece4",
    coelhos:       "#7a3a0a",
  };
  const bg = bgColor[criacao.slug] ?? "#000000";

  return (
    <Link
      href={`/categoria/${criacao.slug}`}
      className="group block overflow-hidden rounded-xl border border-white/10 hover:border-dourado/60 transition-all duration-300 cursor-pointer"
    >
      {/* ============================================================
          PARTE 1 — FOTO
          Altura fixa, sem overlay, sem texto por cima.
          bg-black = fundo fallback para logos com transparência.
          group-hover:scale-105 = zoom suave ao passar o mouse.
          ============================================================ */}
      {/* aspect-[2/1] garante ratio consistente em qualquer tela —
          melhor que h-48 fixo, que varia conforme a largura do card */}
      <div
        className="relative w-full aspect-[2/1] overflow-hidden"
        style={{ backgroundColor: bg }}
      >
        <Image
          src={fotoUrl}
          alt={`${criacao.nome} — ${criacao.categoria}`}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* ============================================================
          PARTE 2 — RODAPÉ
          Fundo sólido escuro — separação clara entre foto e texto.
          flex justify-between para empurrar o botão para a direita.
          ============================================================ */}
      <div className="bg-fundo-card p-4 flex items-start justify-between gap-3">

        {/* Coluna esquerda: categoria + nome + descrição */}
        <div className="flex-1 min-w-0">
          {/* Label da categoria — dourado, uppercase, letra pequena */}
          <p className="font-sans text-dourado text-xs font-semibold tracking-widest uppercase mb-1">
            {criacao.categoria}
          </p>

          {/* Nome da criação — fonte display elegante */}
          <h3 className="font-display font-bold text-white text-xl leading-tight mb-1.5">
            {criacao.nome}
          </h3>

          {/* Descrição limitada a 2 linhas */}
          {criacao.descricao && (
            <p className="font-sans text-texto-secundario text-sm leading-relaxed line-clamp-2">
              {criacao.descricao}
            </p>
          )}
        </div>

        {/* Coluna direita: botão quadrado dourado com seta */}
        <div className="shrink-0 flex items-center justify-center w-9 h-9 bg-dourado group-hover:bg-dourado-hover rounded-lg text-texto-escuro transition-colors duration-200 mt-0.5">
          <IconeSeta />
        </div>

      </div>
    </Link>
  );
}
