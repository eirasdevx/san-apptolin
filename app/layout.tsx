import type { Metadata, Viewport } from 'next'
import Image from 'next/image'
import { BarraInferior } from '@/components/layout/BarraInferior'
import { Cabecera } from '@/components/layout/Cabecera'
import './globals.css'

export const metadata: Metadata = {
  title: 'San Apptolin',
  description:
    'Programa emitido por el Excmo. Ayuntamiento de Medina del Campo para San Antolín 2026. Web creada por la Cuadrilla La Catola con "eiras.devx".',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: '/app-logo.png',
    apple: '/app-logo.png',
  },
  appleWebApp: {
    capable: true,
    title: 'San Apptolin',
    statusBarStyle: 'black-translucent',
  },
  openGraph: {
    title: 'San Apptolin',
    description:
      'Programa de San Antolín 2026 emitido por el Excmo. Ayuntamiento de Medina del Campo. Web creada por la Cuadrilla La Catola con "eiras.devx".',
    locale: 'es_ES',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#241132',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* En App Router esta es la forma recomendada de cargar fuentes externas. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@400;600;700;800&family=DM+Mono:wght@400;500&family=Instrument+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-tinta focus:px-3 focus:py-2 focus:text-panuelo"
        >
          Saltar al contenido
        </a>
        <Cabecera />
        <main id="contenido" className="mx-auto max-w-4xl px-4 pb-28 pt-5 md:pb-12">
          {children}
        </main>
        <BarraInferior />
        <footer className="mx-auto max-w-4xl px-4 pb-28 text-[11px] leading-relaxed text-humo md:pb-8">
          <p>
            Programa emitido por el Excmo. Ayuntamiento de Medina del Campo para
            las Ferias y Fiestas de San Antolín 2026. Esta aplicación lo muestra como guía
            práctica; los horarios pueden cambiar, así que confirma siempre en los canales
            oficiales.
          </p>
          <div className="mt-5 flex flex-col gap-4 border-t border-tinta/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium text-tinta">
                Web creada por la Cuadrilla La Catola con &quot;eiras.devx&quot;.
              </p>
              <p className="mt-1">
                Contacto técnico: Serafín Eiras Martín, Técnico Superior en Desarrollo de
                Aplicaciones Multiplataforma.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Image
                src="/logos/la-catola.png"
                alt="Cuadrilla La Catola"
                width={58}
                height={88}
                className="h-16 w-auto"
              />
              <span className="grid h-12 w-20 place-items-center rounded-lg bg-tinta px-2">
                <Image
                  src="/logos/eiras-devx.png"
                  alt="eiras.devx"
                  width={80}
                  height={80}
                  className="max-h-8 w-auto"
                />
              </span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
