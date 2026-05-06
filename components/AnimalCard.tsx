/* ============================================================
   ANIMALCARD — Card de animal na listagem da página de criação

   Suporta dois layouts via prop "variante":

   "horizontal" (padrão — desktop):
     [FOTO 64×64] [INFO] [SETA →]
     Layout compacto em linha, ideal para grids.

   "vertical" (mobile — carrossel):
     [FOTO full-width × 160px]
     [INFO com nome, metadata e badge]
     Card em bloco, empilhado, com largura fixa no carrossel.

   Ao clicar, chama onClick passado pelo componente pai (ListagemFiltrada),
   que abre o AnimalModal com os detalhes completos.
   ============================================================ */

import Image from "next/image";
import type { Animal } from "@/lib/types";

/* -------------------------------------------------------
   Badge de status — ponto colorido + texto
   ------------------------------------------------------- */
function StatusBadge({ status }: { status: Animal["status"] }) {
  const config = {
    disponivel: { cor: "bg-disponivel", texto: "Disponível" },
    reproducao: { cor: "bg-reproducao", texto: "Reprodução" },
  };
  const { cor, texto } = config[status];
  return (
    <span className="flex items-center gap-1.5 mt-1">
      <span className={`inline-block w-1.5 h-1.5 rounded-full ${cor}`} />
      <span className="font-sans text-xs text-texto-secundario">{texto}</span>
    </span>
  );
}

/* -------------------------------------------------------
   Fallback quando o animal não tem foto cadastrada
   ------------------------------------------------------- */
function IconeAnimal() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
      className="w-6 h-6 text-white/30" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
    </svg>
  );
}

interface AnimalCardProps {
  animal: Animal;
  onClick: () => void;
  /* variante controla o layout visual:
     "horizontal" = desktop (padrão)
     "vertical"   = mobile carrossel */
  variante?: "horizontal" | "vertical";
}

export default function AnimalCard({ animal, onClick, variante = "horizontal" }: AnimalCardProps) {
  const fotoPrincipal =
    animal.fotos_animais.find((f) => f.principal)?.url ??
    animal.fotos_animais[0]?.url ??
    null;

  const metadata = [animal.raca, animal.idade, animal.sexo]
    .filter(Boolean)
    .join(" · ");

  /* -------------------------------------------------------
     VARIANTE VERTICAL — usada no carrossel mobile.
     Foto ocupa a largura total do card no topo,
     informações ficam abaixo em um bloco de padding.
     ------------------------------------------------------- */
  if (variante === "vertical") {
    return (
      <button
        onClick={onClick}
        className="w-full text-left bg-fundo-card border border-white/10 rounded-xl overflow-hidden cursor-pointer active:scale-[0.98] transition-transform duration-150"
      >
        {/* Foto — largura total, altura fixa */}
        <div className="relative w-full h-40">
          {fotoPrincipal ? (
            <Image
              src={fotoPrincipal}
              alt={animal.nome}
              fill
              className="object-cover"
              sizes="75vw"
            />
          ) : (
            <div className="absolute inset-0 bg-white/5 flex items-center justify-center">
              <IconeAnimal />
            </div>
          )}
          {/* Gradiente sutil na base da foto para transição suave */}
          <div className="absolute inset-0 bg-gradient-to-t from-fundo-card/60 to-transparent" />
        </div>

        {/* Informações abaixo da foto */}
        <div className="p-3">
          <p className="font-sans font-semibold text-white text-sm truncate">
            {animal.nome}
          </p>
          {metadata && (
            <p className="font-sans text-xs text-texto-secundario mt-0.5 truncate">
              {metadata}
            </p>
          )}
          <StatusBadge status={animal.status} />
        </div>
      </button>
    );
  }

  /* -------------------------------------------------------
     VARIANTE HORIZONTAL — usada no grid desktop (padrão).
     Layout em linha: foto à esquerda, info ao centro, seta à direita.
     ------------------------------------------------------- */
  return (
    <button
      onClick={onClick}
      className="group w-full text-left flex items-center gap-3 p-3 bg-fundo-card border border-white/10 hover:border-dourado/60 rounded-xl cursor-pointer transition-all duration-200"
    >
      {/* Foto — thumbnail quadrado 64×64 */}
      <div className="shrink-0 w-16 h-16 rounded-lg overflow-hidden">
        {fotoPrincipal ? (
          <Image
            src={fotoPrincipal}
            alt={animal.nome}
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-white/10 flex items-center justify-center">
            <IconeAnimal />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-sans font-medium text-white text-sm truncate">{animal.nome}</p>
        {metadata && (
          <p className="font-sans text-xs text-texto-secundario mt-0.5 truncate">{metadata}</p>
        )}
        <StatusBadge status={animal.status} />
      </div>

      {/* Seta → cinza por padrão, dourada no hover */}
      <span className="text-white/40 group-hover:text-dourado transition-colors duration-200">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
          className="w-4 h-4 shrink-0" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </span>
    </button>
  );
}
