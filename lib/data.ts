/* ============================================================
   DADOS MOCKADOS — Fazenda Fernandina

   Estes são dados fictícios usados para desenvolver a interface
   sem precisar do banco de dados Supabase ainda.

   Na Fase 3, quando o banco estiver configurado, vamos substituir
   esses dados pelas queries reais do arquivo lib/supabase.ts.

   "Mock" = simulação, imitação dos dados reais.
   ============================================================ */

import type { Criacao, Animal } from "./types";

/* -------------------------------------------------------
   As 6 criações da Fazenda Fernandina
   Cada uma vira um card na home e uma página /categoria/[slug]
   ------------------------------------------------------- */
export const CRIACOES_MOCK: Criacao[] = [
  {
    id: "1",
    slug: "cavalos", // aparece na URL: /categoria/cavalos
    nome: "Haras Fernandina",
    categoria: "CAVALOS",
    descricao:
      "Referência nacional na criação do Mangalarga Marchador, com excelência reconhecida na seleção de pampa de preto. A marcha nos define, a excelência nos diferencia.",
    tagline: "A Marcha é o que Nos Move.",
    instagram: "@harasfernandina",
    foto_hero:
      "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=1200",
    criado_em: "2026-01-01",
  },
  {
    id: "2",
    slug: "alpacas",
    nome: "Alpacas dos Andes",
    categoria: "ALPACAS",
    descricao:
      "Criação de alpacas e lhamas com genética de alto padrão, diretamente dos Andes peruanos, 100% puras e rigorosamente selecionadas.",
    tagline: "Alta qualidade genética dos Andes Peruanos.",
    instagram: "@alpacasdosandes",
    foto_hero:
      "https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?w=1200",
    criado_em: "2026-01-01",
  },
  {
    id: "3",
    slug: "mini-cabras",
    nome: "Mini Cabras dos Alpes",
    categoria: "MINI CABRAS",
    descricao:
      "Criação de mini cabras com padrão definido, baseada em seleção consistente e manejo de alto nível.",
    tagline: "Pequenas, dóceis e cheias de vida.",
    instagram: "@minicabrasdosalpes",
    foto_hero:
      "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=1200",
    criado_em: "2026-01-01",
  },
  {
    id: "4",
    slug: "mini-porcos",
    nome: "Mini-Porcos da Serra",
    categoria: "MINI PORCOS",
    descricao:
      "Criação de mini porcos com seleção criteriosa e controle de qualidade em cada geração.",
    tagline: "Excelência se mantém com consistência.",
    instagram: "@miniporcosdaserra",
    foto_hero:
      "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=1200",
    criado_em: "2026-01-01",
  },
  {
    id: "5",
    slug: "coelhos",
    nome: "Coelhos da Montanha",
    categoria: "COELHOS",
    descricao:
      "Criação especializada de coelhos, com foco em genética, padrão e qualidade de linhagem.",
    tagline: "Consistência se constrói geração após geração.",
    instagram: "@coelhosdamontanha",
    foto_hero:
      "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=1200",
    criado_em: "2026-01-01",
  },
  {
    id: "6",
    slug: "mini-gado",
    nome: "Mini Gado Fernandina",
    categoria: "MINI GADO",
    descricao:
      "Criação de mini gado com seleção rigorosa e manejo especializado. Tradição e cuidado em cada geração.",
    tagline: "Pequenos em tamanho, grandes em qualidade.",
    instagram: "@minigadofernandina",
    foto_hero:
      "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200",
    criado_em: "2026-01-01",
  },
];

/* -------------------------------------------------------
   Animais de exemplo para desenvolvimento
   ------------------------------------------------------- */
export const ANIMAIS_MOCK: Animal[] = [
  // ---- CAVALOS — ÉGUAS ----
  {
    id: "a1",
    criacao_id: "1",
    nome: "Bela",
    raca: "Quarto de Milha",
    idade: "2 anos",
    sexo: "Fêmea",
    pelagem: "Alazã",
    grupo: "Éguas",
    status: "reservado",
    andamento: null,
    genealogia_pai: null,
    genealogia_mae: null,
    descricao: "Égua Quarto de Milha de alta performance.",
    ativo: true,
    criado_em: "2026-01-01",
    atualizado_em: "2026-01-01",
    fotos_animais: [],
  },
  {
    id: "a2",
    criacao_id: "1",
    nome: "Ísis",
    raca: "Árabe",
    idade: "6 anos",
    sexo: "Fêmea",
    pelagem: "Tordilha",
    grupo: "Éguas",
    status: "disponivel",
    andamento: null,
    genealogia_pai: null,
    genealogia_mae: null,
    descricao: "Égua Árabe com linhagem importada.",
    ativo: true,
    criado_em: "2026-01-01",
    atualizado_em: "2026-01-01",
    fotos_animais: [],
  },
  {
    id: "a3",
    criacao_id: "1",
    nome: "Serena",
    raca: "Mangalarga",
    idade: "7 anos",
    sexo: "Fêmea",
    pelagem: "Pampa",
    grupo: "Éguas",
    status: "disponivel",
    andamento: "Batida",
    genealogia_pai: null,
    genealogia_mae: null,
    descricao: "Égua Mangalarga de marcha batida impecável.",
    ativo: true,
    criado_em: "2026-01-01",
    atualizado_em: "2026-01-01",
    fotos_animais: [],
  },

  // ---- CAVALOS — GARANHÕES ----
  {
    id: "a4",
    criacao_id: "1",
    nome: "Apollo",
    raca: "Mangalarga Marchador",
    idade: "3 anos",
    sexo: "Macho",
    pelagem: "Pampa de Preto",
    grupo: "Garanhões",
    status: "reproducao",
    andamento: "Batida",
    genealogia_pai: null,
    genealogia_mae: null,
    descricao: "Garanhão campeão regional de marcha batida.",
    ativo: true,
    criado_em: "2026-01-01",
    atualizado_em: "2026-01-01",
    fotos_animais: [],
  },
  {
    id: "a5",
    criacao_id: "1",
    nome: "Thor",
    raca: "Lusitano",
    idade: "4 anos",
    sexo: "Macho",
    pelagem: "Cinza",
    grupo: "Garanhões",
    status: "disponivel",
    andamento: null,
    genealogia_pai: null,
    genealogia_mae: null,
    descricao: "Garanhão Lusitano importado de linhagem nobre.",
    ativo: true,
    criado_em: "2026-01-01",
    atualizado_em: "2026-01-01",
    fotos_animais: [],
  },

  // ---- CAVALOS — POTROS ----
  {
    id: "a6",
    criacao_id: "1",
    nome: "Diana",
    raca: "Mangalarga",
    idade: "5 meses",
    sexo: "Fêmea",
    pelagem: "Tordilha Manchada",
    grupo: "Potros",
    status: "disponivel",
    andamento: "Batida",
    genealogia_pai: "Apollo",
    genealogia_mae: "Serena",
    descricao:
      "Potrinha Mangalarga de conformação perfeita, filha de pai campeão nacional. Criada à pata da mãe no campo.",
    ativo: true,
    criado_em: "2026-01-01",
    atualizado_em: "2026-01-01",
    fotos_animais: [],
  },
  {
    id: "a7",
    criacao_id: "1",
    nome: "Zeus",
    raca: "Quarto de Milha",
    idade: "4 meses",
    sexo: "Macho",
    pelagem: "Alazão",
    grupo: "Potros",
    status: "disponivel",
    andamento: null,
    genealogia_pai: null,
    genealogia_mae: null,
    descricao: "Potro Quarto de Milha com futuro promissor.",
    ativo: true,
    criado_em: "2026-01-01",
    atualizado_em: "2026-01-01",
    fotos_animais: [],
  },
  {
    id: "a8",
    criacao_id: "1",
    nome: "Heitor",
    raca: "Lusitano",
    idade: "1 ano",
    sexo: "Macho",
    pelagem: "Castanho",
    grupo: "Potros",
    status: "reservado",
    andamento: null,
    genealogia_pai: null,
    genealogia_mae: null,
    descricao: "Potro Lusitano de linhagem nobre.",
    ativo: true,
    criado_em: "2026-01-01",
    atualizado_em: "2026-01-01",
    fotos_animais: [],
  },

  // ---- ALPACAS — LHAMAS ----
  {
    id: "b1",
    criacao_id: "2",
    nome: "Cuzco",
    raca: "Lhama Ccara",
    idade: "3 anos",
    sexo: "Macho",
    pelagem: "Branca",
    grupo: "Lhamas",
    status: "disponivel",
    andamento: null,
    genealogia_pai: null,
    genealogia_mae: null,
    descricao: "Lhama Ccara de porte majestoso.",
    ativo: true,
    criado_em: "2026-01-01",
    atualizado_em: "2026-01-01",
    fotos_animais: [],
  },
  {
    id: "b2",
    criacao_id: "2",
    nome: "Inti",
    raca: "Lhama Lanuda",
    idade: "4 anos",
    sexo: "Fêmea",
    pelagem: "Marrom",
    grupo: "Lhamas",
    status: "disponivel",
    andamento: null,
    genealogia_pai: null,
    genealogia_mae: null,
    descricao: "Lhama Lanuda com fibra de altíssima qualidade.",
    ativo: true,
    criado_em: "2026-01-01",
    atualizado_em: "2026-01-01",
    fotos_animais: [],
  },

  // ---- ALPACAS — FILHOTES ----
  {
    id: "b3",
    criacao_id: "2",
    nome: "Neve",
    raca: "Suri",
    idade: "1 ano",
    sexo: "Fêmea",
    pelagem: "Branca",
    grupo: "Filhotes",
    status: "disponivel",
    andamento: null,
    genealogia_pai: null,
    genealogia_mae: null,
    descricao: "Filhote Suri de fibra sedosa.",
    ativo: true,
    criado_em: "2026-01-01",
    atualizado_em: "2026-01-01",
    fotos_animais: [],
  },
  {
    id: "b4",
    criacao_id: "2",
    nome: "Bruma",
    raca: "Huacaya",
    idade: "6 meses",
    sexo: "Fêmea",
    pelagem: "Cinza",
    grupo: "Filhotes",
    status: "disponivel",
    andamento: null,
    genealogia_pai: null,
    genealogia_mae: null,
    descricao: "Filhote Huacaya com fleece denso e uniforme.",
    ativo: true,
    criado_em: "2026-01-01",
    atualizado_em: "2026-01-01",
    fotos_animais: [],
  },
];

/* -------------------------------------------------------
   Categorias de filtro por criação
   Cada criação tem suas próprias categorias de animal
   ------------------------------------------------------- */
export const CATEGORIAS_POR_CRIACAO: Record<string, string[]> = {
  cavalos: ["Éguas", "Garanhões", "Potros", "Embriões", "Coberturas"],
  alpacas: ["Lhamas", "Filhotes", "Adultos", "Reprodutores"],
  "mini-cabras": ["Matrizes", "Filhotes", "Reprodutores"],
  "mini-porcos": ["Matrizes", "Filhotes", "Reprodutores"],
  coelhos: ["Matrizes", "Filhotes", "Reprodutores"],
  "mini-gado": ["Matrizes", "Filhotes", "Reprodutores"],
};

/* -------------------------------------------------------
   Descrição longa de cada criação para a página interna
   ------------------------------------------------------- */
export const DESCRICAO_CRIACAO: Record<string, string> = {
  cavalos:
    "Referência nacional na criação do Mangalarga Marchador, com excelência reconhecida na seleção de pampa de preto. Cada animal é cuidadosamente selecionado por conformação, marcha e temperamento, garantindo padrão genético de alto nível em cada geração.",
  alpacas:
    "Criação de alpacas e lhamas com genética de alto padrão, diretamente dos Andes peruanos, 100% puras e rigorosamente selecionadas. Nossa fibra é referência pela densidade, finura e uniformidade.",
  "mini-cabras":
    "Criação de mini cabras com padrão definido, baseada em seleção consistente e manejo de alto nível. Animais dóceis e saudáveis, criados com atenção individualizada.",
  "mini-porcos":
    "Criação de mini porcos com seleção criteriosa e controle de qualidade em cada geração. Animais domésticos especializados com saúde garantida e temperamento equilibrado.",
  coelhos:
    "Criação especializada de coelhos de raças puras, com foco em genética, padrão e qualidade de linhagem. Variedades selecionadas para beleza, saúde e temperamento.",
  "mini-gado":
    "Criação de mini gado com seleção rigorosa e manejo especializado. Animais de pequeno porte com alto padrão genético, tradição e cuidado em cada geração.",
};

/* -------------------------------------------------------
   Informações de Instagram por criação
   ------------------------------------------------------- */
export const INSTAGRAM_INFO: Record<
  string,
  { handle: string; subtitulo: string; url: string }
> = {
  cavalos: {
    handle: "@harasfernandina",
    subtitulo: "Bastidores, novidades e animais disponíveis.",
    url: "https://instagram.com/harasfernandina",
  },
  alpacas: {
    handle: "@alpacasdosandes",
    subtitulo: "Acompanhe nossas alpacas e lhamas.",
    url: "https://instagram.com/alpacasdosandes",
  },
  "mini-cabras": {
    handle: "@minicabrasdosalpes",
    subtitulo: "Novidades e filhotes disponíveis.",
    url: "https://instagram.com/minicabrasdosalpes",
  },
  "mini-porcos": {
    handle: "@miniporcosdaserra",
    subtitulo: "Acompanhe nossas criações.",
    url: "https://instagram.com/miniporcosdaserra",
  },
  coelhos: {
    handle: "@coelhosdamontanha",
    subtitulo: "Raças e filhotes disponíveis.",
    url: "https://instagram.com/coelhosdamontanha",
  },
  "mini-gado": {
    handle: "@minigadofernandina",
    subtitulo: "Seleção e novidades do mini gado.",
    url: "https://instagram.com/minigadofernandina",
  },
};
