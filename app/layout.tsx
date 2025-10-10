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
      <body>
        <Header/>
        <main className="container py-8">{children}</main>
        <Footer/>
      </body>
    </html>
  )
}
