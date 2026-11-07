'use client'

import Link from 'next/link'
import { Star } from 'lucide-react'
import { FichaEvento } from '@/components/agenda/FichaEvento'
import { useAhora } from '@/hooks/useAhora'
import { useFavoritos } from '@/hooks/useFavoritos'
import { TODOS_EVENTOS } from '@/lib/data/todos-eventos'
import {
  cuentaAtras,
  inicioEvento,
  nombreDia,
  numeroDiaFiesta,
  ordenarPorHora,
} from '@/lib/tiempo'

export function MisPlanes() {
  const ahora = useAhora(30_000)
  const { favoritos, listo } = useFavoritos()

  if (!listo) {
    return <div className="h-40 animate-pulse rounded-2xl bg-tinta/5" aria-hidden />
  }

  const guardados = ordenarPorHora(TODOS_EVENTOS.filter((e) => favoritos.includes(e.id)))

  if (guardados.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-tinta/20 px-5 py-10 text-center">
        <Star className="mx-auto h-7 w-7 text-oro" />
        <h2 className="rotulo mt-3 text-[26px] text-tinta">Aún no hay nada aquí</h2>
        <p className="mx-auto mt-2 max-w-sm text-sm text-humo">
          Toca la estrella de cualquier acto del programa y aparecerá en esta lista, con
          su cuenta atrás. Se guarda en este móvil, sin cuentas ni registros.
        </p>
        <Link
          href="/programa"
          className="mt-5 inline-block rounded-full bg-tinta px-5 py-2.5 text-sm font-medium text-panuelo"
        >
          Abrir el programa
        </Link>
      </div>
    )
  }

  const proximo = ahora
    ? guardados.find((e) => inicioEvento(e) > ahora)
    : undefined

  const porDia = guardados.reduce<Record<string, typeof guardados>>((acc, e) => {
    ;(acc[e.dia] ??= []).push(e)
    return acc
  }, {})

  return (
    <div className="space-y-6">
      {proximo && ahora && (
        <section className="rounded-2xl bg-tinta px-5 py-4 text-panuelo">
          <p className="etiqueta text-celeste">Lo siguiente que has guardado</p>
          <h2 className="mt-1 text-[17px] font-semibold leading-snug">
            {proximo.titulo}
          </h2>
          <p className="mt-1 text-[13px] text-panuelo/70">
            {nombreDia(proximo.dia)} · empieza{' '}
            <span className="font-semibold text-oro">
              {cuentaAtras(inicioEvento(proximo), ahora)}
            </span>
          </p>
        </section>
      )}

      {Object.entries(porDia).map(([dia, eventos]) => {
        const numero = numeroDiaFiesta(dia)
        return (
          <section key={dia}>
            <h2 className="rotulo mb-2 text-[24px] text-tinta">
              {nombreDia(dia)}
              {numero && <span className="text-celeste"> · día {numero}</span>}
            </h2>
            <ul className="space-y-2">
              {eventos.map((e) => (
                <li key={e.id}>
                  <FichaEvento evento={e} ahora={ahora} detallado={false} />
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}
