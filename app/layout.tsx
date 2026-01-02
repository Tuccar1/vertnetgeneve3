import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vernetgeneve - Test Site',
  description: 'Simple test site for Vernetgeneve',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="antialiased">{children}</body>
    </html>
  )
}
