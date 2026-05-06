/* ============================================================
   LISTAGEMFILTRADA — Componente client para busca, filtros e modal

   'use client' é obrigatório aqui porque usamos:
   - useState: para filtros, busca e controle do modal
   - useMemo: para recalcular a lista filtrada eficientemente

   Este componente também é o "dono" do estado do modal:
   guarda qual animal está selecionado e passa para o AnimalModal.
   ============================================================ */
'use client'

import { useState, useMemo } from "react";
import AnimalCard from "@/components/AnimalCard";
import AnimalModal from "@/components/AnimalModal";
import { CATEGORIAS_POR_CRIACAO } from "@/lib/data";
import type { Animal, StatusFiltro } from "@/lib/types";

/* -------------------------------------------------------
   Ícone de lupa para o input de busca
   ------------------------------------------------------- */
function IconeLupa() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      className="w-4 h-4 text-texto-secundario" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
  );
}

interface ListagemFiltradaProps {
  animais: Animal[];   /* todos os animais da criação, vindos do server */
  slug: string;        /* slug da criação, para buscar as categorias corretas */
}

export default function ListagemFiltrada({ animais, slug }: ListagemFiltradaProps) {

  /* -------------------------------------------------------
     ESTADOS DOS FILTROS E DO MODAL
     useState guarda um valor que pode mudar.
     Quando muda, o React re-renderiza o componente automaticamente.

     animalSelecionado: null = modal fechado | Animal = modal aberto com esse animal
     ------------------------------------------------------- */
  const [statusAtivo, setStatusAtivo]             = useState<StatusFiltro>("todos");
  const [categoriaAtiva, setCategoriaAtiva]       = useState<string | null>(null);
  const [termoBusca, setTermoBusca]               = useState("");
  const [animalSelecionado, setAnimalSelecionado] = useState<Animal | null>(null);

  /* -------------------------------------------------------
     CONTADORES DE STATUS
     Calculados uma vez com useMemo para mostrar o total em cada pill.
     useMemo só recalcula quando "animais" mudar.
     ------------------------------------------------------- */
  const contadores = useMemo(() => ({
    todos:       animais.length,
    disponivel:  animais.filter((a) => a.status === "disponivel").length,
    reproducao:  animais.filter((a) => a.status === "reproducao").length,
  }), [animais]);

  /* -------------------------------------------------------
     ANIMAIS FILTRADOS
     Aplica os 3 filtros simultaneamente: status + categoria + busca.
     useMemo só recalcula quando algum dos 4 valores mudar.
     ------------------------------------------------------- */
  const animaisFiltrados = useMemo(() => {
    return animais.filter((animal) => {

      /* Filtro 1: Status */
      const passaStatus =
        statusAtivo === "todos" ||
        animal.status === statusAtivo;

      /* Filtro 2: Categoria (grupo do animal dentro da criação) */
      const passaCategoria =
        categoriaAtiva === null ||
        animal.grupo === categoriaAtiva;

      /* Filtro 3: Busca por texto — nome, raça ou idade
         toLowerCase() torna a busca insensível a maiúsculas/minúsculas
         O "??" é fallback: se raca ou idade for null, retorna false */
      const termo = termoBusca.toLowerCase().trim();
      const passaBusca =
        termo === "" ||
        animal.nome.toLowerCase().includes(termo) ||
        (animal.raca?.toLowerCase().includes(termo) ?? false) ||
        (animal.idade?.toLowerCase().includes(termo) ?? false);

      /* O animal aparece só se passar nos 3 filtros ao mesmo tempo */
      return passaStatus && passaCategoria && passaBusca;
    });
  }, [animais, statusAtivo, categoriaAtiva, termoBusca]);

  /* -------------------------------------------------------
     ANIMAIS AGRUPADOS POR CATEGORIA
     Transforma a lista filtrada em um objeto:
     { "Éguas": [animal1, animal2], "Garanhões": [animal3], ... }
     Só grupos com animais aparecem na tela.
     ------------------------------------------------------- */
  const animaisAgrupados = useMemo(() => {
    return animaisFiltrados.reduce((grupos, animal) => {
      if (!grupos[animal.grupo]) {
        grupos[animal.grupo] = []; /* cria o array do grupo se ainda não existe */
      }
      grupos[animal.grupo].push(animal);
      return grupos;
    }, {} as Record<string, Animal[]>);
  }, [animaisFiltrados]);

  /* Ordem de exibição dos grupos — definida por CATEGORIAS_POR_CRIACAO */
  const ordemGrupos = CATEGORIAS_POR_CRIACAO[slug] ?? [];

  /* Lista final dos grupos que têm animais, na ordem correta */
  const gruposComAnimais = ordemGrupos.filter(
    (grupo) => animaisAgrupados[grupo]?.length > 0
  );

  /* -------------------------------------------------------
     CONFIGURAÇÃO DAS PILLS DE STATUS
     Cavalos usa labels específicos do universo equestre:
     - "Disponível" e "Reservado" são universais
     - "Matriz" substitui "Reprodução" — no haras, éguas e garanhões
       usados para reprodução são chamados de "matrizes/reprodutores",
       não simplesmente "reprodução" como nos outros animais
     - "Todos" é removido para simplificar — a página abre mostrando
       tudo por padrão (statusAtivo = "todos" internamente)
     ------------------------------------------------------- */
  const pillsStatus: { valor: StatusFiltro; label: string }[] =
    slug === "cavalos"
      ? [
          { valor: "disponivel", label: `Disponível (${contadores.disponivel})` },
          { valor: "reproducao", label: `Matriz (${contadores.reproducao})`     },
        ]
      : slug === "alpacas" || slug === "mini-cabras" || slug === "mini-porcos" || slug === "coelhos"
      ? [
          { valor: "disponivel", label: `Disponível (${contadores.disponivel})` },
          { valor: "reproducao", label: `Matriz (${contadores.reproducao})`     },
        ]
      : [
          { valor: "todos",      label: `Todos (${contadores.todos})`            },
          { valor: "disponivel", label: `Disponíveis (${contadores.disponivel})` },
          { valor: "reproducao", label: `Reprodução (${contadores.reproducao})`  },
        ];

  /* Categorias disponíveis para este slug */

  return (
    /* Fragment (<>) agrupa o div da listagem e o modal sem criar elemento extra no DOM.
       O modal precisa estar no mesmo nível para o z-index funcionar corretamente. */
    <>
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-32">

      {/* ---- BARRA DE BUSCA ---- */}
      <div className="relative mb-6">
        {/* Ícone de lupa posicionado dentro do input */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <IconeLupa />
        </div>

        {/* Input de busca — rounded-full = borda totalmente arredondada (pílula) */}
        <input
          type="search"
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
          placeholder="Buscar por nome, raça ou idade..."
          className="w-full bg-fundo-card border border-white/10 rounded-full pl-10 pr-4 py-3 font-sans text-sm text-white placeholder:text-texto-secundario focus:outline-none focus:border-dourado/60 transition-colors duration-200"
        />
      </div>

      {/* ---- PILLS DE STATUS ---- */}
      <div className="flex flex-wrap gap-2 mb-3">
        {pillsStatus.map(({ valor, label }) => (
          <button
            key={valor}
            onClick={() => setStatusAtivo(statusAtivo === valor ? "todos" : valor)}
            /* Pill ativa: fundo dourado, texto escuro
               Pill inativa: borda sutil, texto branco, hover dourado */
            className={`font-sans text-xs font-medium tracking-wide px-4 py-2 rounded-full transition-all duration-200 cursor-pointer ${
              statusAtivo === valor
                ? "bg-dourado text-texto-escuro"
                : "border border-white/20 text-white hover:border-dourado hover:text-dourado"
            }`}
          >
            {label}
          </button>
        ))}
      </div>


      {/* ---- LISTAGEM AGRUPADA ---- */}
      {gruposComAnimais.length === 0 ? (
        /* Mensagem quando nenhum animal passa nos filtros */
        <div className="text-center py-16">
          <p className="font-sans text-texto-secundario text-sm">
            Nenhum animal encontrado com esses filtros.
          </p>
          <button
            onClick={() => {
              setStatusAtivo("todos");
              setCategoriaAtiva(null);
              setTermoBusca("");
            }}
            className="mt-4 font-sans text-xs text-dourado hover:underline cursor-pointer"
          >
            Limpar filtros
          </button>
        </div>
      ) : (
        <div className="space-y-10">
          {gruposComAnimais.map((grupo) => {
            const animaisDoGrupo = animaisAgrupados[grupo];
            return (
              <div key={grupo}>
                {/* Cabeçalho do grupo — nome em uppercase + contador em dourado */}
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="font-sans text-xs font-semibold tracking-widest uppercase text-white">
                    {grupo}
                    {" "}
                    <span className="text-dourado">{animaisDoGrupo.length}</span>
                  </h3>
                  {/* Linha divisória fina */}
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                {/* ---- MOBILE: carrossel horizontal com snap ----
                    Cada card ocupa 75vw, mostrando parte do próximo
                    para indicar visualmente que há mais para deslizar.
                    snap-x snap-mandatory "encaixa" o scroll em cada card. */}
                <div className="flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-hide md:hidden">
                  {animaisDoGrupo.map((animal) => (
                    <div key={animal.id} className="flex-shrink-0 w-[75vw] snap-start">
                      <AnimalCard
                        animal={animal}
                        variante="vertical"
                        onClick={() => setAnimalSelecionado(animal)}
                      />
                    </div>
                  ))}
                </div>

                {/* ---- DESKTOP: grid normal (2 cols tablet, 3 cols desktop) ---- */}
                <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-3">
                  {animaisDoGrupo.map((animal) => (
                    <AnimalCard
                      key={animal.id}
                      animal={animal}
                      onClick={() => setAnimalSelecionado(animal)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>

    {/* ---- MODAL DO ANIMAL ----
        Renderizado fora do div de listagem para ficar no topo do DOM.
        Só aparece quando animalSelecionado não é null.
        onClose zera o estado, fazendo o modal desaparecer. */}
    {animalSelecionado && (
      <AnimalModal
        animal={animalSelecionado}
        onClose={() => setAnimalSelecionado(null)}
      />
    )}
    </>
  );
}

