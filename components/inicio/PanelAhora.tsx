'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Radio } from 'lucide-react'
import { FichaEvento } from '@/components/agenda/FichaEvento'
import { useAhora } from '@/hooks/useAhora'
import { CATOLA_EVENTOS } from '@/lib/data/catola'
import { EVENTOS } from '@/lib/data/eventos'
import {
  cuentaAtras,
  desgloseCuentaAtras,
  diaDelPrograma,
  estadoEvento,
  inicioEvento,
  nombreDia,
  numeroDiaFiesta,
  ordenarPorHora,
  parseDia,
  PRIMER_DIA,
  ULTIMO_DIA,
} from '@/lib/tiempo'
import type { Evento } from '@/types'

/** El momento en que Medina se pone el pañuelo: la bandera en la Colegiata. */
const MOMENTO_DIA_UNO = new Date(2026, 8, 1, 12, 0, 0)

export function PanelAhora() {
  const ahora = useAhora(1000)

  if (!ahora) return <Esqueleto />

  const dia = diaDelPrograma(ahora)
  const numero = numeroDiaFiesta(dia)
  const antesDeEmpezar = ahora < parseDia(PRIMER_DIA)
  const terminado = ahora > new Date(parseDia(ULTIMO_DIA).getTime() + 86_400_000)

  const delDia = ordenarPorHora(EVENTOS.filter((e) => e.dia === dia))
  const enMarcha = delDia.filter((e) => estadoEvento(e, ahora) === 'ahora')
  const pronto = delDia.filter((e) => estadoEvento(e, ahora) === 'pronto')
  const luego = delDia.filter((e) => estadoEvento(e, ahora) === 'futuro')

  const catola = ordenarPorHora(CATOLA_EVENTOS)
  const catolaEnMarcha = catola.find((e) => estadoEvento(e, ahora) === 'ahora')
  const catolaSiguiente = catola.find((e) => inicioEvento(e) > ahora)
  // Si no queda nada suyo por delante, el hueco se queda vacío.
  const actoCatola = catolaEnMarcha ?? catolaSiguiente

  const siguienteEncierro = ordenarPorHora(
    EVENTOS.filter((e) => e.categoria === 'encierro' && inicioEvento(e) > ahora),
  )[0]

  const cuenta = desgloseCuentaAtras(MOMENTO_DIA_UNO, ahora)
  const mostrarCuentaAtras = ahora < MOMENTO_DIA_UNO

  return (
    <div className="space-y-8 animate-subir">
      {/* Portada: el estado de las fiestas en una frase, y la puerta al
          programa de La Catola. */}
      <Link
        href="/catola"
        aria-label="Ver el programa de la Cuadrilla La Catola"
        className="block overflow-hidden rounded-3xl bg-tinta text-panuelo transition hover:brightness-125"
      >
        <div className="px-5 py-6 sm:px-7 sm:py-8">
          <p className="etiqueta text-celeste">
            {terminado
              ? 'San Antolín 2026'
              : antesDeEmpezar
                ? 'Cuenta atrás'
                : nombreDia(dia)}
          </p>

          {terminado ? (
            <h1 className="rotulo mt-2 text-[46px] sm:text-[64px]">
              Hasta el año
              <br />
              que viene
            </h1>
          ) : (
            <div className="mt-2 flex items-center justify-between gap-4">
              <h1 className="rotulo min-w-0 text-[40px] leading-[0.9] sm:text-[62px]">
                {numero ? (
                  <>
                    Felices fiestas
                    <br />
                    de San Antolin
                  </>
                ) : (
                  <>
                    Ya huele
                    <br />a San Antolin
                  </>
                )}
              </h1>
              <Image
                src="/logos/la-catola.png"
                alt="Cuadrilla La Catola"
                width={116}
                height={176}
                priority
                className="h-24 w-auto shrink-0 sm:h-36"
              />
            </div>
          )}

          {actoCatola && (
            <div className="mt-5 flex items-center gap-3 border-t border-panuelo/15 pt-4">
              <div className="min-w-0 flex-1">
                <p className="etiqueta text-celeste">La Catola</p>
                <p className="mt-1 text-[15px] font-semibold leading-snug">
                  {actoCatola.titulo}
                </p>
                {catolaEnMarcha ? (
                  <p className="mt-0.5 inline-flex items-center gap-2 text-[13px] font-semibold text-oro">
                    <span className="h-2 w-2 animate-latido rounded-full bg-oro" />
                    En marcha ahora
                  </p>
                ) : (
                  <p className="mt-0.5 text-[13px] text-panuelo/70">
                    {nombreDia(actoCatola.dia)} · empieza{' '}
                    <span className="font-semibold text-oro">
                      {cuentaAtras(inicioEvento(actoCatola), ahora)}
                    </span>
                  </p>
                )}
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-celeste" />
            </div>
          )}

          {mostrarCuentaAtras && (
            <div className="mt-5 border-t border-panuelo/15 pt-4">
              <p className="text-[13px] text-panuelo/70">
                Para la bandera en lo alto de la Colegiata
              </p>
              <div className="mt-2 flex items-end gap-4 font-mono tabular-nums">
                <Cifra valor={cuenta.dias} unidad="días" />
                <Cifra valor={cuenta.horas} unidad="horas" />
                <Cifra valor={cuenta.minutos} unidad="min" />
                <Cifra valor={cuenta.segundos} unidad="seg" apagado />
              </div>
            </div>
          )}

          {!mostrarCuentaAtras && siguienteEncierro && (
            <div className="mt-5 flex flex-wrap items-baseline gap-x-2 gap-y-1 border-t border-panuelo/15 pt-4 text-[13px]">
              <span className="text-panuelo/70">Próximo encierro:</span>
              <span className="font-semibold text-oro">
                {cuentaAtras(inicioEvento(siguienteEncierro), ahora)}
              </span>
              <span className="text-panuelo/50">
                · {nombreDia(siguienteEncierro.dia)}
              </span>
            </div>
          )}
        </div>
      </Link>

      <Bloque
        titulo="Ahora mismo"
        vacio="No hay nada en marcha en este momento. Buen rato para un vermú."
        eventos={enMarcha}
        ahora={ahora}
        directo
      />

      <Bloque
        titulo="A punto de empezar"
        vacio="Nada en la próxima hora y media."
        eventos={pronto}
        ahora={ahora}
      />

      <Bloque
        titulo="Más tarde"
        vacio="Se acabó el programa de hoy."
        eventos={luego.slice(0, 6)}
        ahora={ahora}
      />

      <Link
        href={`/programa?dia=${dia}`}
        className="flex items-center justify-between rounded-2xl border border-tinta/10 bg-panuelo px-4 py-3 text-sm font-medium text-tinta transition hover:border-azul/40 hover:text-azul"
      >
        Ver el día entero en el programa
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  )
}

function Cifra({
  valor,
  unidad,
  apagado,
}: {
  valor: number
  unidad: string
  apagado?: boolean
}) {
  return (
    <div>
      <div
        className={`text-[32px] font-medium leading-none sm:text-[38px] ${
          apagado ? 'text-panuelo/40' : 'text-panuelo'
        }`}
      >
        {String(valor).padStart(2, '0')}
      </div>
      <div className="etiqueta mt-1 text-[9px] text-panuelo/50">{unidad}</div>
    </div>
  )
}

function Bloque({
  titulo,
  vacio,
  eventos,
  ahora,
  directo = false,
}: {
  titulo: string
  vacio: string
  eventos: Evento[]
  ahora: Date
  directo?: boolean
}) {
  return (
    <section>
      <h2 className="rotulo mb-3 flex items-center gap-2 text-[26px] text-tinta">
        {directo && eventos.length > 0 && (
          <Radio className="h-4 w-4 animate-latido text-grana" />
        )}
        {titulo}
      </h2>
      {eventos.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-tinta/20 px-4 py-5 text-sm text-humo">
          {vacio}
        </p>
      ) : (
        <div className="space-y-2">
          {eventos.map((evento) => (
            <FichaEvento
              key={evento.id}
              evento={evento}
              ahora={ahora}
              detallado={directo}
            />
          ))}
        </div>
      )}
    </section>
  )
}

function Esqueleto() {
  return (
    <div className="space-y-4" aria-hidden>
      <div className="h-56 animate-pulse rounded-3xl bg-tinta/10" />
      <div className="h-20 animate-pulse rounded-2xl bg-tinta/5" />
      <div className="h-20 animate-pulse rounded-2xl bg-tinta/5" />
    </div>
  )
}
