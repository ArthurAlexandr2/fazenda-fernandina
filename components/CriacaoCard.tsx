/* ============================================================
   CRIAÇÃOCARD — Card de criação no grid da home

   Recebe os dados de uma criação e renderiza o card com:
   - Foto de fundo com gradiente escuro
   - Categoria, nome, descrição
   - Seta que vira dourada no hover
   - Zoom na foto ao passar o mouse
   - Borda dourada visível no hover do card inteiro
   - Link para /categoria/[slug]
   ============================================================ */

import Image from "next/image";
import Link from "next/link";
import type { Criacao } from "@/lib/types";


interface CriacaoCardProps {
  criacao: Criacao;
}

export default function CriacaoCard({ criacao }: CriacaoCardProps) {
  const fotoUrl =
    criacao.foto_hero ||
    "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800";

  return (
    /* "group" no Link permite que filhos reajam ao hover do card inteiro.
       border border-transparent → hover:border-dourado/60:
         no estado normal a borda é invisível (transparente),
         no hover aparece dourada com 60% de opacidade — sutil mas elegante.
       rounded-xl = border-radius de 12px (mais moderno que rounded-lg).
       overflow-hidden = a foto com zoom não "vaza" para fora do card. */
    <Link
      href={`/categoria/${criacao.slug}`}
      className="group relative block h-80 overflow-hidden rounded-xl border border-transparent hover:border-dourado/60 transition-all duration-300 cursor-pointer"
    >
      {/* ---- FOTO DE FUNDO ----
          group-hover:scale-105 = zoom de 5% ao passar o mouse no card inteiro.
          duration-500 = animação lenta e suave (500ms). */}
      <Image
        src={fotoUrl}
        alt={`${criacao.nome} — ${criacao.categoria}`}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />

      {/* Gradiente escuro da base para o topo — para o texto ser legível */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* ---- CONTEÚDO — parte inferior do card ---- */}
      <div className="absolute inset-0 flex flex-col justify-end p-5">
        <span className="font-sans text-dourado-texto text-xs font-semibold tracking-widest uppercase mb-1">
          {criacao.categoria}
        </span>
        <h3 className="font-display text-white font-bold text-2xl leading-tight mb-1">
          {criacao.nome}
        </h3>
        {criacao.descricao && (
          <p className="font-sans text-texto-secundario text-sm line-clamp-2">
            {criacao.descricao}
          </p>
        )}
      </div>

    </Link>
  );
}
