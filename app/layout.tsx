import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '3D печать, 3D моделирование и 3D сканирование на заказ — бесплатная консультация',
  description:
    '3D печать деталей, 3D моделирование и 3D сканирование на заказ. Печать автозапчастей, корпусов, креплений, фигурок и технических деталей. Реверс-инжиниринг, восстановление деталей по образцу, фото и скану. Бесплатная консультация по материалам и производству.'
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
