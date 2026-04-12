/* ============================================================
   WHATSAPPBUTTON — Botão flutuante com balão de conversa

   'use client' para o estado de fechar o balão (dispensar).
   O balão aparece automaticamente e pode ser fechado com o X.
   ============================================================ */
'use client'

import { useState } from "react";
import { linkWhatsApp } from "@/lib/whatsapp";

function IconeWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export default function WhatsAppButton() {
  const [balaoVisivel, setBalaoVisivel] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">

      {/* ---- BALÃO DE CONVERSA ---- */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          balaoVisivel
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-3 pointer-events-none"
        }`}
      >
        <div className="relative bg-fundo-card border border-white/10 rounded-2xl rounded-br-sm shadow-xl w-64 p-4">

          {/* Botão fechar */}
          <button
            onClick={() => setBalaoVisivel(false)}
            aria-label="Fechar"
            className="absolute top-2.5 right-2.5 text-white/30 hover:text-white/70 transition-colors duration-150 cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
              className="w-3.5 h-3.5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Cabeçalho: avatar + nome + status online */}
          <div className="flex items-center gap-2.5 mb-3 pr-4">
            {/* Avatar circular verde com ícone WA */}
            <div className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-whatsapp text-white">
              <IconeWhatsApp />
            </div>
            <div>
              <p className="font-sans font-semibold text-white text-xs leading-tight">
                Fazenda Fernandina
              </p>
              {/* Indicador online pulsante */}
              <span className="flex items-center gap-1 mt-0.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                </span>
                <span className="font-sans text-[10px] text-green-400">Online agora</span>
              </span>
            </div>
          </div>

          {/* Mensagem */}
          <div className="bg-fundo rounded-xl rounded-tl-sm px-3 py-2.5">
            <p className="font-sans text-xs text-white/80 leading-relaxed">
              Olá! Estamos à disposição para tirar dúvidas e apresentar nossos animais.
            </p>
          </div>

          {/* Horário de atendimento */}
          <p className="font-sans text-[10px] text-texto-secundario mt-2.5 text-center tracking-wide">
            Atendemos todos os dias · 09h às 18h
          </p>

          {/* Cauda do balão — quadrado rotacionado no canto inferior direito */}
          <div className="absolute -bottom-[7px] right-[18px] w-3.5 h-3.5 bg-fundo-card border-r border-b border-white/10 rotate-45" />
        </div>
      </div>

      {/* ---- BOTÃO CIRCULAR WHATSAPP ---- */}
      <a
        href={linkWhatsApp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Entrar em contato pelo WhatsApp"
        onClick={() => setBalaoVisivel(false)}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-whatsapp hover:bg-whatsapp-hover text-white shadow-lg hover:shadow-green-500/25 hover:scale-110 transition-all duration-200"
      >
        <IconeWhatsApp />
      </a>

    </div>
  );
}
