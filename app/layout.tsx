import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: '3D печать, моделирование и сканирование',
  url: siteUrl,
  description:
    '3D печать, 3D моделирование и 3D сканирование на заказ. Подбор материалов, реверс-инжиниринг, бесплатные консультации.',
  areaServed: {
    '@type': 'Country',
    name: 'Россия'
  },
  serviceType: [
    '3D печать пластиков',
    '3D моделирование технических деталей',
    '3D сканирование и реверс-инжиниринг'
  ],
  sameAs: ['https://t.me/evgenyssh']
}

export const metadata: Metadata = {
  title: '3D печать, 3D моделирование и 3D сканирование на заказ — бесплатная консультация',
  description:
    '3D печать деталей, 3D моделирование и 3D сканирование на заказ. Печать автозапчастей, корпусов, креплений, фигурок и технических деталей. Реверс-инжиниринг, восстановление деталей по образцу, фото и скану. Бесплатная консультация по материалам и производству.',
  keywords: [
    '3D печать Москва',
    '3D печать на заказ',
    '3D моделирование деталей',
    '3D сканирование',
    'прототипирование',
    'аддитивное производство',
    'reverse engineering',
    '3D печать автозапчастей',
    '3D печать корпусов',
    '3D печать креплений',
    'FDM печать',
    'PLA ABS PETG',
    'пластик с наполнением',
    'TPU нейлон',
    'модели для печати'
  ],
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: '3D печать, 3D моделирование и 3D сканирование на заказ',
    description:
      'Профессиональные услуги 3D печати, моделирования и сканирования: автозапчасти, корпуса, крепления, фигурки, реверс-инжиниринг и консультации по материалам.',
    url: siteUrl,
    siteName: '3D-услуги',
    locale: 'ru_RU',
    type: 'website',
    images: [
      {
        url: '/images/hero/hero-main.webp',
        width: 1200,
        height: 630,
        alt: '3D печать и моделирование изделий на заказ'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: '3D печать, моделирование и сканирование на заказ',
    description:
      '3D печать деталей, моделирование и сканирование на заказ. Подбор материалов, реверс-инжиниринг, бесплатная консультация.',
    images: ['/images/hero/hero-main.webp']
  }
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `(function(m,e,t,r,i,k,a){
    m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=105410776', 'ym');

ym(105410776, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});`,
          }}
        />
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/105410776"
              style={{ position: 'absolute', left: '-9999px' }}
              alt=""
            />
          </div>
        </noscript>
      </head>
      <body>
        <Header/>
        <main className="container py-8">{children}</main>
        <Footer/>
      </body>
    </html>
  )
}
