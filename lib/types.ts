/* ============================================================
   TIPOS TYPESCRIPT — Fazenda Fernandina

   TypeScript usa "tipos" para garantir que os dados tenham o formato certo.
   É como um contrato: se um Animal precisa ter "nome", o TypeScript vai
   avisar com erro antes de rodar o código se você esquecer esse campo.

   Isso evita bugs e torna o código mais fácil de entender.
   ============================================================ */

/* -------------------------------------------------------
   Representa uma criação (ex: Haras Fernandina, Alpacas dos Andes)
   Cada criação tem sua própria página e grid de animais
   ------------------------------------------------------- */
export interface Criacao {
  id: string;
  slug: string; // identificador na URL: "cavalos", "alpacas", etc.
  nome: string; // "Haras Fernandina"
  categoria: string; // "CAVALOS" — label em uppercase para exibição
  descricao: string | null; // "| null" significa que pode ser vazio
  tagline: string | null; // frase de impacto abaixo do título
  instagram: string | null; // "@harasfernandina"
  foto_hero: string | null; // URL da foto do hero (Supabase Storage ou Unsplash)
  criado_em: string;
}

/* -------------------------------------------------------
   Representa uma foto de um animal
   Um animal pode ter várias fotos — a principal aparece no card
   ------------------------------------------------------- */
export interface FotoAnimal {
  url: string; // URL completa da foto
  principal: boolean; // TRUE = usada no thumbnail do card da listagem
  ordem: number; // ordem de exibição na galeria de detalhes
}

/* -------------------------------------------------------
   Representa um animal
   Cada animal pertence a uma criação (criacao_id)
   ------------------------------------------------------- */
export interface Animal {
  id: string;
  criacao_id: string; // conecta o animal à sua criação
  nome: string; // "Diana"
  descricao: string | null; // texto descritivo individual do animal
  raca: string | null; // "Mangalarga", "Huacaya", "Lhama Ccara"
  idade: string | null; // "5 meses", "2 anos" — texto livre
  sexo: string | null; // "Macho" ou "Fêmea"
  pelagem: string | null; // "Tordilha Manchada"
  grupo: string; // categoria do animal dentro da criação

  // status tem apenas 3 valores possíveis — TypeScript garante isso
  status: "disponivel" | "reservado" | "reproducao";

  // campos exclusivos de cavalos (null nos outros animais)
  andamento: string | null; // "Batida" ou "Picada"
  genealogia_pai: string | null; // nome do pai
  genealogia_mae: string | null; // nome da mãe

  ativo: boolean; // false = oculto do site (sem deletar do banco)
  criado_em: string;
  atualizado_em: string;

  fotos_animais: FotoAnimal[]; // array de fotos (pode ser vazio [])
  criacoes?: Criacao; // join opcional com os dados da criação pai
}

/* -------------------------------------------------------
   Tipo para o filtro de status ativo na página de criação
   ------------------------------------------------------- */
export type StatusFiltro = "todos" | "disponivel" | "reservado" | "reproducao";
