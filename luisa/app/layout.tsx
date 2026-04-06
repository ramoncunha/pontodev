import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Chá de Bebê da Luisa',
  description: 'Lista de presentes para o chá de bebê da Luisa',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
