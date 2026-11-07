'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { LogoBar } from '@/components/bares/LogoBar'
import { cn } from '@/lib/utils'

export interface BarEnSlider {
  id: string
  nombre: string
  logo: string
  /** Cuántos actos tiene en el programa. */
  actos: number
  /** La primera línea de su programa, para dar una pista de qué hace. */
  adelanto?: string
}

const ESPERA = 4500

export function SliderBares({ bares }: { bares: BarEnSlider[] }) {
  const pista = useRef<HTMLDivElement>(null)
  const [actual, setActual] = useState(0)
  const [parado, setParado] = useState(false)

  const irA = useCallback((indice: number) => {
    const el = pista.current
    if (!el) return
    el.scrollTo({ left: indice * el.clientWidth, behavior: 'smooth' })
  }, [])

  // Se pasa solo, salvo que lo estés tocando o tengas el motion reducido.
  useEffect(() => {
    if (parado || bares.length < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const reloj = setInterval(() => {
      const el = pista.current
      if (!el) return
      const siguiente = (Math.round(el.scrollLeft / el.clientWidth) + 1) % bares.length
      el.scrollTo({ left: siguiente * el.clientWidth, behavior: 'smooth' })
    }, ESPERA)

    return () => clearInterval(reloj)
  }, [parado, bares.length])

  const alDesplazar = () => {
    const el = pista.current
    if (!el) return
    setActual(Math.round(el.scrollLeft / el.clientWidth))
  }

  return (
    <section
      aria-roledescription="carrusel"
      aria-label="Bares que colaboran con La Catola"
      onPointerEnter={() => setParado(true)}
      onPointerLeave={() => setParado(false)}
      onFocusCapture={() => setParado(true)}
      onBlurCapture={() => setParado(false)}
    >
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <h2 className="rotulo text-[30px] text-tinta">Bares que colaboran</h2>
          <p className="mt-1 text-[13px] text-humo">
            Toca uno para ver todo lo que organiza estas fiestas.
          </p>
        </div>
        {bares.length > 1 && (
          <div className="flex shrink-0 gap-1">
            <BotonPaso
              etiqueta="Bar anterior"
              onClick={() => irA((actual - 1 + bares.length) % bares.length)}
            >
              <ChevronLeft className="h-4 w-4" />
            </BotonPaso>
            <BotonPaso
              etiqueta="Bar siguiente"
              onClick={() => irA((actual + 1) % bares.length)}
            >
              <ChevronRight className="h-4 w-4" />
            </BotonPaso>
          </div>
        )}
      </div>

      {/* Scroll-snap: el gesto de arrastrar en el móvil sale gratis. */}
      <div
        ref={pista}
        onScroll={alDesplazar}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {bares.map((bar, i) => (
          <div
            key={bar.id}
            className="w-full shrink-0 snap-center px-[2px]"
            aria-hidden={i !== actual}
          >
            <Link
              href={`/bares/${bar.id}`}
              tabIndex={i === actual ? undefined : -1}
              className="group block overflow-hidden rounded-2xl bg-tinta transition hover:brightness-110"
            >
              <div className="relative grid h-32 place-items-center px-6 py-4 sm:h-40">
                <LogoBar src={bar.logo} nombre={bar.nombre} className="p-5" />
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-panuelo/10 px-4 py-3">
                <div className="min-w-0">
                  <p className="text-[14px] font-semibold text-panuelo">{bar.nombre}</p>
                  <p className="truncate text-[12px] text-panuelo/60">
                    {bar.adelanto ?? `${bar.actos} ${bar.actos === 1 ? 'acto' : 'actos'}`}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-celeste transition group-hover:translate-x-0.5" />
              </div>
            </Link>
          </div>
        ))}
      </div>

      {bares.length > 1 && (
        <div className="mt-3 flex justify-center gap-1.5">
          {bares.map((bar, i) => (
            <button
              key={bar.id}
              type="button"
              onClick={() => irA(i)}
              aria-label={`Ver ${bar.nombre}`}
              aria-current={i === actual}
              className={cn(
                'h-1.5 rounded-full transition-all',
                i === actual ? 'w-6 bg-azul' : 'w-1.5 bg-tinta/20 hover:bg-tinta/40',
              )}
            />
          ))}
        </div>
      )}
    </section>
  )
}

function BotonPaso({
  etiqueta,
  onClick,
  children,
}: {
  etiqueta: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={etiqueta}
      className="grid h-8 w-8 place-items-center rounded-full border border-tinta/15 bg-panuelo text-humo transition hover:border-azul/40 hover:text-azul"
    >
      {children}
    </button>
  )
}
