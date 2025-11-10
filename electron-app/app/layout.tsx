import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SoulSync - Mental Health Companion',
  description: 'Empathetic AI Mental Health Companion',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
