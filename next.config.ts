import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Permite carregar imagens de domínios externos com o componente <Image>
    // Sem essa configuração, imagens do Unsplash e outros serviços seriam bloqueadas
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        // Permite qualquer caminho dentro do Unsplash
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
