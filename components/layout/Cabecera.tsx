'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CalendarDays, Crown, Info, MapPin, Radio, Star } from 'lucide-react'
import { useAhora } from '@/hooks/useAhora'
import {
  diaDelPrograma,
  formatoHora,
  nombreDia,
  numeroDiaFiesta,
} from '@/lib/tiempo'
import { cn } from '@/lib/utils'

export const ENLACES = [
  { href: '/', etiqueta: 'Ahora', Icono: Radio },
  { href: '/programa', etiqueta: 'Programa', Icono: CalendarDays },
  { href: '/catola', etiqueta: 'Catola', Icono: Crown },
  { href: '/mapa', etiqueta: 'Mapa', Icono: MapPin },
  { href: '/mio', etiqueta: 'Lo mío', Icono: Star },
]

export function Cabecera() {
  const pathname = usePathname()
  const ahora = useAhora(1000)
  const dia = ahora ? diaDelPrograma(ahora) : null
  const numero = dia ? numeroDiaFiesta(dia) : null

  return (
    <header className="sticky top-0 z-40 bg-tinta text-panuelo">
      <div className="mx-auto flex max-w-4xl items-center gap-4 px-4 py-3">
        <Link href="/" className="rotulo text-[30px] leading-none sm:text-[34px]">
          San<span className="text-celeste">App</span>tolin
        </Link>

        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {ENLACES.map(({ href, etiqueta }) => {
            const activo = href === '/' ? pathname === '/' : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                aria-current={activo ? 'page' : undefined}
                className={cn(
                  'rounded-full px-3 py-1.5 text-sm transition',
                  activo
                    ? 'bg-panuelo text-tinta'
                    : 'text-panuelo/70 hover:bg-panuelo/10 hover:text-panuelo',
                )}
              >
                {etiqueta}
              </Link>
            )
          })}
          <Link
            href="/info"
            aria-label="Avisos y teléfonos"
            className={cn(
              'flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold tracking-normal transition hover:bg-panuelo/10',
              pathname.startsWith('/info') ? 'bg-panuelo text-tinta' : 'text-panuelo/70',
            )}
          >
            <Info className="h-[18px] w-[18px]" />
            <span>INFO</span>
          </Link>
        </nav>

        <div className="ml-auto text-right md:ml-4">
          <div className="font-mono text-[17px] font-medium tabular-nums">
            {ahora ? formatoHora(ahora) : '--:--'}
          </div>
          <div className="etiqueta text-[9px] text-celeste">
            {dia ? (numero ? `Día ${numero} de fiestas` : 'Prefiestas') : 'Medina del Campo'}
          </div>
        </div>

        <Link
          href="/info"
          aria-label="Avisos y teléfonos"
          className="flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold tracking-normal text-panuelo/70 transition hover:bg-panuelo/10 md:hidden"
        >
          <Info className="h-5 w-5" />
          <span>INFO</span>
        </Link>
      </div>

      {ahora && (
        <div className="border-t border-panuelo/10 bg-tinta/95">
          <p className="mx-auto max-w-4xl px-4 py-1.5 text-[11px] text-panuelo/60">
            Hoy es {nombreDia(diaDelPrograma(ahora))}
          </p>
        </div>
      )}
    </header>
  )
}
