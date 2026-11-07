'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  AlertTriangle,
  ChevronDown,
  MapPin,
  Route,
  Star,
  Ticket,
  Users,
} from 'lucide-react'
import { PildoraCategoria } from '@/components/agenda/PildoraCategoria'
import { useFavoritos } from '@/hooks/useFavoritos'
import { nombreLugar } from '@/lib/data/lugares'
import {
  cuentaAtras,
  estadoEvento,
  finEvento,
  formatoHora,
  inicioEvento,
  paradaActual,
  progresoEvento,
} from '@/lib/tiempo'
import { cn } from '@/lib/utils'
import type { Evento, Parada } from '@/types'

interface Props {
  evento: Evento
  ahora: Date | null
  /** Muestra el día además de la hora (listas que mezclan fechas). */
  mostrarDia?: string
  detallado?: boolean
}

function nombreParada(parada: Parada): string {
  return parada.nombre ?? (parada.lugarId ? nombreLugar(parada.lugarId) : 'Parada')
}

export function FichaEvento({ evento, ahora, mostrarDia, detallado = true }: Props) {
  const { esFavorito, alternar, listo } = useFavoritos()
  const [abierto, setAbierto] = useState(false)
  const estado = ahora ? estadoEvento(evento, ahora) : 'futuro'
  const inicio = inicioEvento(evento)
  const enMarcha = estado === 'ahora'
  const pasado = estado === 'pasado'
  const favorito = listo && esFavorito(evento.id)

  const paradas = evento.paradas ?? []
  const desplegable = paradas.length > 0
  const enParada = ahora && desplegable ? paradaActual(evento, ahora) : -1
  const panelId = `recorrido-${evento.id}`

  return (
    <article
      className={cn(
        'group relative rounded-2xl border transition',
        enMarcha
          ? 'border-grana/40 bg-panuelo shadow-[0_10px_30px_-18px_rgba(168,35,43,.9)]'
          : 'border-tinta/10 bg-panuelo',
        pasado && 'opacity-55',
        desplegable && abierto && 'border-azul/35',
      )}
    >
      {enMarcha && (
        <div className="absolute inset-x-0 -top-px h-[3px] overflow-hidden rounded-t-2xl bg-grana/15">
          <div
            className="h-full bg-grana transition-[width] duration-1000"
            style={{ width: `${ahora ? progresoEvento(evento, ahora) : 0}%` }}
          />
        </div>
      )}

      {/* Toda la ficha abre el recorrido; los enlaces de dentro siguen a lo suyo. */}
      <div
        onClick={desplegable ? () => setAbierto((v) => !v) : undefined}
        className={cn('flex gap-3 p-3 sm:gap-4 sm:p-4', desplegable && 'cursor-pointer')}
      >
        <div className="w-[52px] shrink-0 pt-[2px] text-right">
          <div
            className={cn(
              'font-mono text-[15px] font-medium tabular-nums',
              enMarcha ? 'text-grana' : 'text-tinta',
            )}
          >
            {formatoHora(inicio)}
          </div>
          {evento.horaAprox && (
            <div className="etiqueta text-[9px] text-humo">aprox.</div>
          )}
          {mostrarDia && (
            <div className="etiqueta mt-1 text-[9px] text-humo">{mostrarDia}</div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-[15px] font-semibold leading-snug text-tinta">
              {evento.titulo}
            </h3>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                alternar(evento.id)
              }}
              aria-pressed={favorito}
              aria-label={
                favorito
                  ? `Quitar ${evento.titulo} de mi San Antolín`
                  : `Guardar ${evento.titulo} en mi San Antolín`
              }
              className="-m-1 shrink-0 rounded-full p-1 text-humo transition hover:text-oro"
            >
              <Star
                className={cn('h-[18px] w-[18px]', favorito && 'fill-oro text-oro')}
              />
            </button>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
            <PildoraCategoria categoria={evento.categoria} />
            {evento.lugarId ? (
              <Link
                href={`/mapa?lugar=${evento.lugarId}`}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 text-[12px] text-humo underline-offset-2 hover:text-azul hover:underline"
              >
                <MapPin className="h-3 w-3" />
                {evento.lugarTexto ?? nombreLugar(evento.lugarId)}
              </Link>
            ) : (
              <span className="inline-flex items-center gap-1 text-[12px] text-humo">
                <MapPin className="h-3 w-3" />
                {evento.lugarTexto ?? 'Sitio por confirmar'}
              </span>
            )}
          </div>

          {enMarcha && (
            <p className="mt-2 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wide text-grana">
              <span className="h-2 w-2 animate-latido rounded-full bg-grana" />
              {enParada >= 0
                ? `En marcha · ahora en ${nombreParada(paradas[enParada])}`
                : `En marcha · termina sobre las ${formatoHora(finEvento(evento))}`}
            </p>
          )}
          {estado === 'pronto' && ahora && (
            <p className="mt-2 text-[12px] font-semibold text-azul">
              Empieza {cuentaAtras(inicio, ahora)}
            </p>
          )}

          {detallado && evento.descripcion && (
            <p className="mt-2 text-[13px] leading-relaxed text-tinta/75">
              {evento.descripcion}
            </p>
          )}

          {detallado && (
            <div className="mt-2 space-y-1 text-[12px] text-humo">
              {/* Con paradas el recorrido se ve desplegado, sin repetirlo aquí. */}
              {evento.recorrido && !desplegable && (
                <p className="flex gap-1.5">
                  <Route className="mt-[2px] h-3.5 w-3.5 shrink-0" />
                  <span>{evento.recorrido}</span>
                </p>
              )}
              {evento.precio && (
                <p className="flex gap-1.5">
                  <Ticket className="mt-[2px] h-3.5 w-3.5 shrink-0" />
                  <span>{evento.precio}</span>
                </p>
              )}
              {evento.organiza && (
                <p className="flex gap-1.5">
                  <Users className="mt-[2px] h-3.5 w-3.5 shrink-0" />
                  <span>{evento.organiza}</span>
                </p>
              )}
            </div>
          )}

          {desplegable && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setAbierto((v) => !v)
              }}
              aria-expanded={abierto}
              aria-controls={panelId}
              className="mt-2 inline-flex items-center gap-1 text-[12px] font-medium text-azul"
            >
              <Route className="h-3.5 w-3.5" />
              {abierto
                ? 'Ocultar el recorrido'
                : `Ver el recorrido · ${paradas.length} paradas`}
              <ChevronDown
                className={cn(
                  'h-3.5 w-3.5 transition-transform',
                  abierto && 'rotate-180',
                )}
              />
            </button>
          )}

          {detallado && evento.aviso && !desplegable && (
            <p className="mt-3 flex gap-2 rounded-xl bg-oro/10 px-3 py-2 text-[12px] leading-relaxed text-[#7A5205]">
              <AlertTriangle className="mt-[2px] h-3.5 w-3.5 shrink-0" />
              <span>{evento.aviso}</span>
            </p>
          )}
        </div>
      </div>

      {desplegable && abierto && (
        <div
          id={panelId}
          className="animate-subir border-t border-tinta/10 px-3 pb-3 pt-3 sm:px-4 sm:pb-4"
        >
          {!detallado && evento.descripcion && (
            <p className="mb-3 text-[13px] leading-relaxed text-tinta/75">
              {evento.descripcion}
            </p>
          )}

          <p className="etiqueta mb-2 text-humo">Paradas</p>
          <ol>
            {paradas.map((parada, i) => {
              const activa = i === enParada
              const hecha = pasado || (enParada >= 0 && i < enParada)
              const ultima = i === paradas.length - 1
              return (
                <li key={`${parada.hora}-${i}`} className="flex gap-3">
                  <div className="flex w-[52px] shrink-0 justify-end pt-[1px]">
                    <span
                      className={cn(
                        'font-mono text-[13px] tabular-nums',
                        activa ? 'font-semibold text-grana' : 'text-tinta',
                        !activa && hecha && 'text-humo',
                      )}
                    >
                      {parada.hora}
                    </span>
                  </div>

                  <div className="relative flex w-3 shrink-0 justify-center">
                    <span
                      className={cn(
                        'relative z-10 mt-[5px] h-[11px] w-[11px] shrink-0 rounded-full border-2 bg-panuelo',
                        activa && 'animate-latido border-grana bg-grana',
                        !activa && hecha && 'border-tinta/25 bg-tinta/25',
                        !activa && !hecha && 'border-azul/50',
                      )}
                    />
                    {!ultima && (
                      <span className="absolute inset-y-0 top-3 w-px bg-tinta/15" />
                    )}
                  </div>

                  <div className={cn('min-w-0 flex-1', !ultima && 'pb-4')}>
                    {parada.lugarId ? (
                      <Link
                        href={`/mapa?lugar=${parada.lugarId}`}
                        className="inline-flex items-center gap-1 text-[14px] font-medium text-tinta underline-offset-2 hover:text-azul hover:underline"
                      >
                        {nombreParada(parada)}
                        <MapPin className="h-3 w-3 text-humo" />
                      </Link>
                    ) : (
                      <span className="text-[14px] font-medium text-tinta">
                        {nombreParada(parada)}
                      </span>
                    )}
                    {parada.detalle && (
                      <p className="mt-0.5 text-[12px] text-humo">{parada.detalle}</p>
                    )}
                    {activa && (
                      <p className="mt-0.5 text-[12px] font-semibold text-grana">
                        La charanga anda por aquí
                      </p>
                    )}
                  </div>
                </li>
              )
            })}
          </ol>

          {evento.aviso && (
            <p className="mt-3 flex gap-2 rounded-xl bg-oro/10 px-3 py-2 text-[12px] leading-relaxed text-[#7A5205]">
              <AlertTriangle className="mt-[2px] h-3.5 w-3.5 shrink-0" />
              <span>{evento.aviso}</span>
            </p>
          )}
        </div>
      )}
    </article>
  )
}
