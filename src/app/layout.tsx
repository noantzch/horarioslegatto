import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import Navbar from './navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Horarios Legatto',
  description: 'Gestión de horarios Academia Legatto',
  icons: './legato_logo.jpg'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="es">
        <body className={inter.className}>
          <Navbar />
          {children}
          </body>
      </html>
    </ClerkProvider>
  )
}
