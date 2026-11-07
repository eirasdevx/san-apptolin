'use client'

import { FichaEvento } from '@/components/agenda/FichaEvento'
import { useAhora } from '@/hooks/useAhora'
import { nombreDia, numeroDiaFiesta, ordenarPorHora } from '@/lib/tiempo'
import type { Evento } from '@/types'

export function ProgramaBar({ eventos }: { eventos: Evento[] }) {
  const ahora = useAhora(30_000)

  if (eventos.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-tinta/20 px-4 py-8 text-center text-sm text-humo">
        Todavía no hay nada suyo en el programa. En cuanto lo anuncien, aparece aquí.
      </p>
    )
  }

  const porDia = ordenarPorHora(eventos).reduce<Record<string, Evento[]>>((acc, e) => {
    ;(acc[e.dia] ??= []).push(e)
    return acc
  }, {})

  return (
    <div className="space-y-6">
      {Object.entries(porDia).map(([dia, delDia]) => {
        const numero = numeroDiaFiesta(dia)
        return (
          <section key={dia}>
            <h2 className="rotulo mb-2 text-[24px] text-tinta">
              {nombreDia(dia)}
              {numero && <span className="text-celeste"> · día {numero}</span>}
            </h2>
            <ol className="space-y-2">
              {delDia.map((e) => (
                <li key={e.id}>
                  <FichaEvento evento={e} ahora={ahora} />
                </li>
              ))}
            </ol>
          </section>
        )
      })}
    </div>
  )
}
