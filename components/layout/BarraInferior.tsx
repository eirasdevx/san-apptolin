'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ENLACES } from '@/components/layout/Cabecera'
import { cn } from '@/lib/utils'

export function BarraInferior() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Secciones"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-tinta/10 bg-panuelo/95 backdrop-blur md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="mx-auto flex max-w-md">
        {ENLACES.map(({ href, etiqueta, Icono }) => {
          const activo = href === '/' ? pathname === '/' : pathname.startsWith(href)
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={activo ? 'page' : undefined}
                className={cn(
                  'flex flex-col items-center gap-0.5 py-2 text-[11px] transition',
                  activo ? 'text-azul' : 'text-humo',
                )}
              >
                <Icono className={cn('h-5 w-5', activo && 'stroke-[2.4]')} />
                {etiqueta}
                <span
                  className={cn(
                    'h-[3px] w-6 rounded-full transition',
                    activo ? 'bg-azul' : 'bg-transparent',
                  )}
                />
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
