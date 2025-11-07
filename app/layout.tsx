import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '3D Studio — 3D-печать и 3D-моделирование',
  description: '3D-печать на заказ, 3D-моделирование, продажа 3D-моделей. Печать в термокамере, помощь на всех этапах.'
}

export default function RootLayout({children}:{children:React.ReactNode}){
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/favicon.png" sizes="32x32" />
        <link rel="icon" href="/favicon-32.png" sizes="32x32" />
        <link rel="icon" href="/favicon-192.png" sizes="192x192" />
        <link rel="icon" href="/favicon-512.png" sizes="512x512" />
        <link rel="apple-touch-icon" href="/favicon-192.png" />
        <meta name="theme-color" content="#1E1E1E" />
      </head>
      <body>
        <Header/>
        <main className="container py-8">{children}</main>
        <Footer/>
      </body>
    </html>
  )
}
