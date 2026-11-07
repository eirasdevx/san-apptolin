'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useAhora } from '@/hooks/useAhora'
import { diaCorto, diaDelPrograma, diasDelPrograma, numeroDiaFiesta } from '@/lib/tiempo'
import { cn } from '@/lib/utils'

export function SelectorDias({ dia, cat }: { dia: string; cat?: string }) {
  const ahora = useAhora(60_000)
  const hoy = ahora ? diaDelPrograma(ahora) : null
  const activoRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    activoRef.current?.scrollIntoView({ block: 'nearest', inline: 'center' })
  }, [dia])

  return (
    <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex gap-1.5 pb-1">
        {diasDelPrograma().map((d) => {
          const { semana, numero, mes } = diaCorto(d)
          const activo = d === dia
          const esHoy = d === hoy
          const nFiesta = numeroDiaFiesta(d)
          return (
            <Link
              key={d}
              ref={activo ? activoRef : undefined}
              href={{ pathname: '/programa', query: { dia: d, ...(cat ? { cat } : {}) } }}
              aria-current={activo ? 'date' : undefined}
              className={cn(
                'relative flex w-[54px] shrink-0 flex-col items-center rounded-xl border px-1 py-2 transition',
                activo
                  ? 'border-tinta bg-tinta text-panuelo'
                  : 'border-tinta/10 bg-panuelo text-tinta hover:border-azul/40',
              )}
            >
              <span
                className={cn(
                  'etiqueta text-[9px]',
                  activo ? 'text-celeste' : 'text-humo',
                )}
              >
                {semana}
              </span>
              <span className="font-display text-[26px] font-bold leading-none">
                {numero}
              </span>
              <span
                className={cn(
                  'text-[10px]',
                  activo ? 'text-panuelo/60' : 'text-humo',
                )}
              >
                {nFiesta ? `día ${nFiesta}` : mes}
              </span>
              {/* Dentro de la tarjeta: el contenedor con overflow-x recorta
                  cualquier cosa que se salga por arriba. */}
              {esHoy && (
                <span
                  aria-label="hoy"
                  className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-verde"
                />
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
