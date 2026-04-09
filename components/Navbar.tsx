/* ============================================================
   NAVBAR — Barra de navegação fixa no topo

   'use client' é necessário porque este componente usa hooks do React
   (useState e useEffect) — funcionalidades que só existem no navegador.
   Componentes com 'use client' rodam tanto no servidor (para o HTML inicial)
   quanto no cliente (para a interatividade depois que a página carrega).
   ============================================================ */
'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { linkWhatsApp } from "@/lib/whatsapp";

/* Ícone SVG do WhatsApp — inline para não precisar de biblioteca */
function IconeWhatsApp() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-4 h-4"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export default function Navbar() {
  /* -------------------------------------------------------
     ESTADO DE SCROLL
     useState(false) cria uma variável "scrolled" que começa como false.
     Quando ela muda, o React re-renderiza o componente automaticamente,
     aplicando as classes CSS corretas para o novo estado visual.
     ------------------------------------------------------- */
  const [scrolled, setScrolled] = useState(false);

  /* -------------------------------------------------------
     EFEITO DE SCROLL — escuta o evento de rolagem da página
     useEffect roda depois que o componente aparece na tela.
     O array vazio [] no final significa "rodar só uma vez" (ao montar).

     Como funciona:
       1. Registramos a função handleScroll no evento 'scroll' da janela
       2. Sempre que o usuário rola, handleScroll verifica se scrollY > 10
       3. Se sim, scrolled vira true → navbar fica escura
       4. Se voltar ao topo, scrolled vira false → navbar fica transparente

     O "return" ao final é a função de limpeza (cleanup):
       - Roda quando o componente é removido da tela
       - Remove o listener para não causar vazamento de memória
     ------------------------------------------------------- */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);

    window.addEventListener('scroll', handleScroll);

    /* Limpeza: remove o listener quando o componente sai da tela */
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    /* -------------------------------------------------------
       DOIS ESTADOS VISUAIS controlados pela variável "scrolled":

       Estado 1 — topo (scrolled = false):
         bg-transparent + sem blur → navbar invisível sobre o hero

       Estado 2 — rolando (scrolled = true):
         bg-black/80 + backdrop-blur-md → navbar escura com vidro fosco

       transition-all duration-300 = animação suave de 300ms entre os dois estados
       ------------------------------------------------------- */
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-md border-b border-borda'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        {/* ---- LOGO ---- */}
        <Link
          href="/"
          aria-label="Fazenda Fernandina — página inicial"
        >
          <Image
            src="/logo-navbar.png"
            alt="Fazenda Fernandina"
            width={180}
            height={52}
            priority
            className="object-contain"
          />
        </Link>

        {/* ---- LINKS DE NAVEGAÇÃO ---- */}
        <div className="flex items-center gap-6 lg:gap-8">

          {/* Cada link é envolto em um <span className="group"> para que o underline
              animado (filho) reaja ao hover do link via group-hover.
              "relative" no span permite posicionar o underline com absolute abaixo. */}

          <span className="group relative hidden md:block">
            <a
              href="/#quem-somos"
              className="text-xs font-sans font-medium tracking-widest uppercase text-texto-secundario hover:text-dourado transition-colors duration-200"
            >
              Quem Somos
            </a>
            {/* Underline dourado animado:
                scale-x-0 = invisível por padrão (largura 0)
                group-hover:scale-x-100 = expande para largura total no hover
                origin-left = a expansão começa da esquerda para a direita
                transition-transform duration-300 = animação suave de 300ms */}
            <span className="block h-px bg-dourado scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </span>

          <span className="group relative hidden md:block">
            <a
              href="/#criacoes"
              className="text-xs font-sans font-medium tracking-widest uppercase text-texto-secundario hover:text-dourado transition-colors duration-200"
            >
              Nossas Criações
            </a>
            <span className="block h-px bg-dourado scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </span>

          <span className="group relative hidden md:block">
            <a
              href="/#contato"
              className="text-xs font-sans font-medium tracking-widest uppercase text-texto-secundario hover:text-dourado transition-colors duration-200"
            >
              Contato
            </a>
            <span className="block h-px bg-dourado scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </span>

          {/* Botão WhatsApp — hover: fundo mais claro + leve crescimento */}
          <a
            href={linkWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-dourado hover:bg-dourado-hover hover:scale-105 text-texto-escuro font-sans font-semibold text-xs tracking-widest uppercase px-4 py-2.5 rounded-full transition-all duration-200"
          >
            <IconeWhatsApp />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
