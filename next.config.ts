/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Esto crea la carpeta 'out' con tu HTML/CSS/JS
  images: {
    unoptimized: true, // Necesario para que las imágenes funcionen en GitHub Pages
  },
  // Si tu repo no es "username.github.io", añade esto:
  // basePath: '/nombre-de-tu-repo', 
};

export default nextConfig;