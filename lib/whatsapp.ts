/* ============================================================
   UTILITÁRIO WHATSAPP — Fazenda Fernandina

   Centraliza a geração de links do WhatsApp.
   Assim, se o número mudar, mudamos em um único lugar.
   ============================================================ */

/* Número da fazenda no formato internacional:
   55 = Brasil | 81 = DDD Pernambuco | resto = número
   Substituir pelo número real quando disponível */
const WHATSAPP_NUMERO = "5581996976298";
const MENSAGEM_PADRAO = "Olá, tenho interesse em falar com a equipe de atendimento da Fazenda Fernandina!";

/* -------------------------------------------------------
   Link genérico — usado nos botões da home e da seção de contato
   ------------------------------------------------------- */
export const linkWhatsApp = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(MENSAGEM_PADRAO)}`;

/* -------------------------------------------------------
   Link com mensagem pré-preenchida — usado na página do animal
   encodeURIComponent converte acentos e espaços para formato de URL
   ------------------------------------------------------- */
export const linkWhatsAppAnimal = (nomeAnimal: string, nomeCriacao: string) =>
  `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(
    `Olá! Tenho interesse no animal ${nomeAnimal} (${nomeCriacao}) da Fazenda Fernandina. Poderia me passar mais informações?`
  )}`;

/* -------------------------------------------------------
   Link com mensagem para equipe — usado nas páginas de criação
   ------------------------------------------------------- */
export const linkWhatsAppEquipe = (nomeCriacao: string) =>
  `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(
    `Olá! Tenho interesse em animais do ${nomeCriacao} da Fazenda Fernandina. Poderia me ajudar?`
  )}`;
