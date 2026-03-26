// app/layout.tsx
import "./globals.css"; // <--- ESTO ES CRUCIAL

// ... el resto de tu código, por ejemplo:
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jesús Villalba | Portafolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}