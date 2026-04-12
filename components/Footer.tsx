/* ============================================================
   FOOTER — Rodapé do site

   Aparece em todas as páginas, incluído no layout.tsx.
   Design simples: logo + copyright.
   ============================================================ */

import Image from "next/image";

export default function Footer() {
  return (
    /* Borda no topo para separar visualmente do conteúdo acima */
    <footer className="bg-fundo">
      {/* Linha decorativa: gradiente dourado que brilha no centro e desvanece nas bordas */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-dourado/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* ---- LOGO ----
            Mesma logo da navbar (logo-navbar.png), só um pouco menor.
            O tamanho menor (120x35) fica proporcional ao rodapé compacto. */}
        <Image
          src="/logo-navbar.png"
          alt="Fazenda Fernandina"
          width={120}
          height={35}
          className="object-contain"
        />

        {/* ---- COPYRIGHT ---- */}
        <p className="font-sans text-xs text-texto-secundario text-center sm:text-right">
          © 2026 Fazenda Fernandina · Todos os direitos reservados
        </p>
      </div>
    </footer>
  );
}
