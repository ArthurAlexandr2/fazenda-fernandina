/* ============================================================
   NAVBAR — Barra de navegação fixa no topo

   Mobile: hambúrguer → dropdown compacto animado abaixo da barra.
   O painel não cobre a tela — desliza suavemente de cima com
   opacity + translateY, sem bloquear o conteúdo da página.
   ============================================================ */
'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { linkWhatsApp } from "@/lib/whatsapp";

function IconeWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

/* -------------------------------------------------------
   Ícone hambúrguer animado → X
   Cada traço é um span que transforma individualmente.
   ------------------------------------------------------- */
function IconeHamburguer({ aberto }: { aberto: boolean }) {
  return (
    <div className="w-5 h-4 flex flex-col justify-between" aria-hidden="true">
      <span className={`block h-px bg-white transition-all duration-300 ease-in-out origin-center ${
        aberto ? "rotate-45 translate-y-[7.5px]" : ""
      }`} />
      <span className={`block h-px bg-white transition-all duration-200 ease-in-out ${
        aberto ? "opacity-0 scale-x-50" : ""
      }`} />
      <span className={`block h-px bg-white transition-all duration-300 ease-in-out origin-center ${
        aberto ? "-rotate-45 -translate-y-[7.5px]" : ""
      }`} />
    </div>
  );
}

const LINKS = [
  { label: "Quem Somos",      href: "/#quem-somos" },
  { label: "Nossas Criações", href: "/#criacoes"   },
  { label: "Contato",         href: "/#contato"    },
];

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuAberto(false); };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  const fecharMenu = () => setMenuAberto(false);

  return (
    <>
      {/* ---- HEADER FIXO ---- */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled || menuAberto
            ? "bg-black/90 backdrop-blur-md border-b border-borda"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">

          <Link href="/" aria-label="Fazenda Fernandina — página inicial" onClick={fecharMenu}>
            <Image
              src="/logo-navbar.png"
              alt="Fazenda Fernandina"
              width={180}
              height={52}
              priority
              style={{ height: "auto" }}
              className="object-contain"
            />
          </Link>

          {/* Links desktop */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {LINKS.map(({ label, href }) => (
              <span key={href} className="group relative">
                <a href={href} className="text-xs font-sans font-medium tracking-widest uppercase text-texto-secundario hover:text-dourado transition-colors duration-200">
                  {label}
                </a>
                <span className="block h-px bg-dourado scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </span>
            ))}
            <a
              href={linkWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-dourado hover:bg-dourado-hover hover:scale-105 text-texto-escuro font-sans font-semibold text-xs tracking-widest uppercase px-4 py-2.5 rounded-full transition-all duration-200"
            >
              <IconeWhatsApp />
              WhatsApp
            </a>
          </div>

          {/* Botão hambúrguer — só mobile */}
          <button
            onClick={() => setMenuAberto((v) => !v)}
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuAberto}
            className="md:hidden flex items-center justify-center w-10 h-10 cursor-pointer"
          >
            <IconeHamburguer aberto={menuAberto} />
          </button>

        </nav>
      </header>

      {/* ================================================================
          DROPDOWN MOBILE
          Sempre no DOM — visibilidade controlada por opacity + translateY.
          Isso permite a transição CSS suave ao abrir e fechar.

          Fechado:  opacity-0 + -translate-y-2 + pointer-events-none
          Aberto:   opacity-100 + translate-y-0 + pointer-events-auto
          ================================================================ */}
      <div
        className={`fixed inset-x-0 top-20 z-40 md:hidden transition-all duration-300 ease-in-out ${
          menuAberto
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="bg-black/90 backdrop-blur-xl border-b border-borda">

          {/* Links */}
          <nav className="max-w-7xl mx-auto px-6 py-2">
            {LINKS.map(({ label, href }, i) => (
              <a
                key={href}
                href={href}
                onClick={fecharMenu}
                className={`flex items-center justify-between py-4 text-sm font-sans font-medium tracking-widest uppercase text-white/80 hover:text-dourado transition-colors duration-200 ${
                  i < LINKS.length - 1 ? "border-b border-white/10" : ""
                }`}
              >
                {label}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
                  className="w-4 h-4 opacity-40" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            ))}
          </nav>

          {/* CTA WhatsApp */}
          <div className="max-w-7xl mx-auto px-6 py-4">
            <a
              href={linkWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={fecharMenu}
              className="flex items-center justify-center gap-2 w-full bg-dourado text-texto-escuro font-sans font-semibold text-xs tracking-widest uppercase py-3.5 rounded-full transition-colors duration-200 hover:bg-dourado-hover"
            >
              <IconeWhatsApp />
              Falar pelo WhatsApp
            </a>
          </div>

          {/* Linha dourada na base do dropdown */}
          <div className="h-px bg-gradient-to-r from-transparent via-dourado/30 to-transparent" />

        </div>
      </div>
    </>
  );
}
