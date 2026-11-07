'use client'

import { useMemo, useState } from 'react'
import { Search, Star } from 'lucide-react'
import { FichaEvento } from '@/components/agenda/FichaEvento'
import { useAhora } from '@/hooks/useAhora'
import { useFavoritos } from '@/hooks/useFavoritos'
import { nombreLugar } from '@/lib/data/lugares'
import { diaDelPrograma, formatoHora, inicioEvento, ordenarPorHora } from '@/lib/tiempo'
import { cn, normaliza } from '@/lib/utils'
import type { Evento } from '@/types'

export function ListaDia({ eventos, dia }: { eventos: Evento[]; dia: string }) {
  const ahora = useAhora(30_000)
  const { favoritos } = useFavoritos()
  const [busqueda, setBusqueda] = useState('')
  const [soloFavoritos, setSoloFavoritos] = useState(false)

  const visibles = useMemo(() => {
    const q = normaliza(busqueda.trim())
    return ordenarPorHora(
      eventos.filter((e) => {
        if (soloFavoritos && !favoritos.includes(e.id)) return false
        if (!q) return true
        const texto = normaliza(
          [
            e.titulo,
            e.descripcion,
            e.organiza,
            e.recorrido,
            e.lugarTexto,
            e.lugarId && nombreLugar(e.lugarId),
          ]
            .filter(Boolean)
            .join(' '),
        )
        return texto.includes(q)
      }),
    )
  }, [eventos, busqueda, soloFavoritos, favoritos])

  const esHoy = ahora ? diaDelPrograma(ahora) === dia : false
  const yaPasados =
    esHoy && ahora
      ? visibles.filter((e) => inicioEvento(e) <= ahora).length
      : -1

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-humo" />
          <input
            type="search"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar charanga, peña, sitio…"
            aria-label="Buscar en el programa del día"
            className="w-full rounded-full border border-tinta/15 bg-panuelo py-2.5 pl-9 pr-3 text-sm text-tinta placeholder:text-humo/70"
          />
        </div>
        <button
          type="button"
          onClick={() => setSoloFavoritos((v) => !v)}
          aria-pressed={soloFavoritos}
          className={cn(
            'flex shrink-0 items-center gap-1.5 rounded-full border px-3 text-[12px] font-medium transition',
            soloFavoritos
              ? 'border-oro bg-oro/15 text-[#8A5D06]'
              : 'border-tinta/15 bg-panuelo text-humo',
          )}
        >
          <Star className={cn('h-4 w-4', soloFavoritos && 'fill-oro text-oro')} />
          Míos
        </button>
      </div>

      {visibles.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-tinta/20 px-4 py-8 text-center text-sm text-humo">
          {soloFavoritos
            ? 'Todavía no has guardado nada de este día. Toca la estrella de un acto para tenerlo a mano.'
            : 'Nada coincide con esa búsqueda. Prueba con otra palabra.'}
        </p>
      ) : (
        <ol className="space-y-2">
          {visibles.map((evento, i) => (
            <li key={evento.id}>
              {i === yaPasados && yaPasados > 0 && ahora && (
                <MarcaAhora hora={formatoHora(ahora)} />
              )}
              <FichaEvento evento={evento} ahora={ahora} />
            </li>
          ))}
          {esHoy && ahora && yaPasados === visibles.length && (
            <li>
              <MarcaAhora hora={formatoHora(ahora)} />
              <p className="px-1 pt-1 text-[13px] text-humo">
                Se acabó el programa de hoy.
              </p>
            </li>
          )}
        </ol>
      )}
    </div>
  )
}

/** El nudo del pañuelo: separa lo vivido de lo que queda por vivir. */
function MarcaAhora({ hora }: { hora: string }) {
  return (
    <div className="my-3 flex items-center gap-2" aria-label={`Son las ${hora}`}>
      <span className="h-2.5 w-2.5 rotate-45 rounded-[2px] bg-grana" />
      <span className="etiqueta font-medium text-grana">Ahora · {hora}</span>
      <span className="h-px flex-1 bg-grana/30" />
    </div>
  )
}
