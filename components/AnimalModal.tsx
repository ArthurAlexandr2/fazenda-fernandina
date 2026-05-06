/* ============================================================
   ANIMALMODAL — Drawer que desliza de baixo com os detalhes do animal

   'use client' é obrigatório porque:
   - useEffect: para escutar a tecla ESC e bloquear o scroll da página
   - Eventos de clique para fechar o modal

   COMO FUNCIONA O PADRÃO DRAWER:
   O painel desliza de baixo para cima (como uma gaveta).
   O overlay escuro atrás bloqueia a página e fecha ao ser clicado.
   O usuário não perde o lugar na listagem — a página continua aberta atrás.
   ============================================================ */
'use client'

import { useEffect } from "react";
import Image from "next/image";
import { linkWhatsAppAnimal } from "@/lib/whatsapp";
import type { Animal } from "@/lib/types";

/* -------------------------------------------------------
   Ícone do WhatsApp para o CTA
   ------------------------------------------------------- */
function IconeWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

/* -------------------------------------------------------
   Ícone X para fechar o modal
   ------------------------------------------------------- */
function IconeFechar() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
      className="w-4 h-4" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
}

/* -------------------------------------------------------
   Badge de status com ponto colorido — usado na foto do modal
   ------------------------------------------------------- */
function StatusBadge({ status }: { status: Animal["status"] }) {
  const config = {
    disponivel: { cor: "bg-disponivel", texto: "Disponível" },
    reproducao: { cor: "bg-reproducao", texto: "Reprodução" },
  };
  const { cor, texto } = config[status];
  return (
    <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full">
      <span className={`w-1.5 h-1.5 rounded-full ${cor}`} />
      <span className="font-sans text-white text-xs">{texto}</span>
    </span>
  );
}

/* -------------------------------------------------------
   Campo individual da ficha técnica
   ------------------------------------------------------- */
function CampoFicha({
  label,
  valor,
  destaque = false,
}: {
  label: string;
  valor: string;
  destaque?: boolean;
}) {
  return (
    <div className={`bg-fundo rounded-xl p-3 border ${destaque ? "border-dourado/40" : "border-white/10"}`}>
      <p className="font-sans text-[10px] uppercase tracking-widest text-dourado mb-1">{label}</p>
      <p className={`font-sans text-sm font-medium ${destaque ? "text-dourado" : "text-white"}`}>{valor}</p>
    </div>
  );
}

/* -------------------------------------------------------
   PROPS DO COMPONENTE
   ------------------------------------------------------- */
interface AnimalModalProps {
  animal: Animal;
  onClose: () => void; /* função chamada para fechar o modal */
}

export default function AnimalModal({ animal, onClose }: AnimalModalProps) {
  /* -------------------------------------------------------
     EFEITO: bloqueia o scroll da página enquanto o modal está aberto.
     Sem isso, o usuário pode rolar a listagem atrás do drawer.
     O return faz a limpeza: restaura o scroll ao fechar.
     ------------------------------------------------------- */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  /* -------------------------------------------------------
     EFEITO: fecha o modal ao apertar a tecla ESC.
     Convenção universal de UX — o usuário espera que ESC feche janelas.
     O return remove o listener para evitar vazamento de memória.
     ------------------------------------------------------- */
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  /* Foto principal do animal */
  const fotoPrincipal =
    animal.fotos_animais.find((f) => f.principal)?.url ??
    animal.fotos_animais[0]?.url ??
    null;

  /* Metadata: "5 meses · Fêmea · Mangalarga" */
  const metadata = [animal.idade, animal.sexo, animal.raca]
    .filter(Boolean)
    .join(" · ");

  /* Texto do status em português */
  const statusTexto = {
    disponivel: "Disponível",
    reproducao: "Reprodução",
  }[animal.status];

  return (
    /* ---- OVERLAY ----
       Cobre a tela inteira com preto semitransparente.
       Clicar no overlay (mas não no painel) chama onClose.
       animate-in/fade-in não existe no Tailwind puro — usamos opacity via classe. */
    <div
      className="fixed inset-0 z-50 bg-black/70"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-label={`Detalhes de ${animal.nome}`}
    >
      {/* ---- PAINEL / DRAWER ----
          e.stopPropagation() impede que cliques DENTRO do painel
          se propaguem até o overlay e fechem o modal por engano. */}
      <div
        className="fixed bottom-0 left-0 right-0 max-h-[90vh] overflow-y-auto bg-fundo-card rounded-t-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ---- HANDLE ----
            Barra cinza no topo — indica visualmente que o drawer pode ser
            "arrastado" para fechar (comportamento padrão em apps mobile). */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-12 h-1 bg-white/20 rounded-full" />
        </div>

        {/* ---- FOTO DO ANIMAL ----
            Ocupa a largura total do drawer com altura fixa de 192px.
            Se não houver foto, mostra um fundo degradê escuro. */}
        <div className="relative w-full h-48 mt-2">
          {fotoPrincipal ? (
            <Image
              src={fotoPrincipal}
              alt={animal.nome}
              fill
              className="object-cover"
              sizes="100vw"
            />
          ) : (
            /* Fallback visual quando o animal não tem foto cadastrada */
            <div className="absolute inset-0 bg-gradient-to-b from-fundo-card to-fundo" />
          )}

          {/* Gradiente escuro na base da foto — para o texto ser legível */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/75" />

          {/* Nome + metadata na base da foto */}
          <div className="absolute bottom-3 left-4 right-14">
            <h2 className="font-display font-bold text-white text-4xl leading-tight">
              {animal.nome}
            </h2>
            {metadata && (
              <p className="font-sans text-white/70 text-sm mt-0.5">{metadata}</p>
            )}
          </div>

          {/* Badge de status — canto inferior direito da foto */}
          <div className="absolute bottom-3 right-4">
            <StatusBadge status={animal.status} />
          </div>

          {/* Botão fechar ✕ — canto superior direito da foto
              Círculo escuro semitransparente para contraste sobre qualquer foto */}
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors duration-200 cursor-pointer"
          >
            <IconeFechar />
          </button>
        </div>

        {/* ---- CONTEÚDO — padding interno do drawer ---- */}
        <div className="p-6 pb-0">

          {/* DESCRIÇÃO DO ANIMAL */}
          {animal.descricao && (
            <p className="font-sans text-texto-secundario text-sm leading-relaxed mb-6">
              {animal.descricao}
            </p>
          )}

          {/* FICHA TÉCNICA */}
          <p className="font-sans text-xs font-semibold uppercase tracking-widest text-dourado mb-3">
            Ficha Técnica
          </p>

          <div className="grid grid-cols-2 gap-2 mb-6">
            {/* Campos universais */}
            {animal.raca    && <CampoFicha label="Raça"    valor={animal.raca}    />}
            {animal.idade   && <CampoFicha label="Idade"   valor={animal.idade}   />}
            {animal.sexo    && <CampoFicha label="Sexo"    valor={animal.sexo}    />}
                               <CampoFicha label="Grupo"   valor={animal.grupo}   />
            {animal.pelagem && <CampoFicha label="Pelagem" valor={animal.pelagem} />}
                               <CampoFicha label="Status"  valor={statusTexto}    />

            {/* ANDAMENTO — exclusivo de cavalos.
                Só aparece quando o campo estiver preenchido (não null).
                Valor: "Batida" ou "Picada" */}
            {animal.andamento && (
              <CampoFicha label="Andamento" valor={animal.andamento} />
            )}

            {/* GENEALOGIA — exclusivo de cavalos, só quando ambos os campos existirem.
                Ocupa as 2 colunas (col-span-2) por ser uma informação mais longa.
                Formato: "Pai × Mãe" — o símbolo × é a notação padrão em genética animal.
                Borda e texto dourados para destacar a informação de maior valor comercial. */}
            {/* Mostra se ao menos um dos campos existir — o || garante que
                um animal com só o pai (ou só a mãe) cadastrado também exibe */}
            {(animal.genealogia_pai || animal.genealogia_mae) && (
              <div className="col-span-2 bg-fundo border border-dourado/40 rounded-xl p-3">
                <p className="font-sans text-[10px] uppercase tracking-widest text-dourado mb-1">
                  Genealogia
                </p>
                <p className="font-sans text-sm font-medium text-dourado">
                  {/* Se tiver os dois: "Pai × Mãe". Se tiver só um, mostra só ele. */}
                  {animal.genealogia_pai && animal.genealogia_mae
                    ? `${animal.genealogia_pai} × ${animal.genealogia_mae}`
                    : animal.genealogia_pai ?? animal.genealogia_mae}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ---- CTA — botão WhatsApp fixo na base do drawer ----
            sticky bottom-0 = gruda na base do drawer enquanto o conteúdo rola.
            mx-4 mb-4 = margem para não encostar nas bordas. */}
        <div className="sticky bottom-0 bg-fundo-card pt-2 pb-4 px-4">
          <a
            href={linkWhatsAppAnimal(animal.nome)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full bg-whatsapp hover:bg-whatsapp-hover text-white font-sans font-semibold text-base py-4 rounded-xl transition-colors duration-200"
          >
            <IconeWhatsApp />
            Falar sobre este animal
          </a>
        </div>

      </div>
    </div>
  );
}
