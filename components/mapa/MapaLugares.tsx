'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { Map as MapaLeaflet, LayerGroup } from 'leaflet'
import { FichaEvento } from '@/components/agenda/FichaEvento'
import { useAhora } from '@/hooks/useAhora'
import { resumenLugares, type ResumenLugar } from '@/lib/agenda'
import { getCategoria } from '@/lib/categorias'
import { cuentaAtras, formatoHora, inicioEvento } from '@/lib/tiempo'
import { cn } from '@/lib/utils'
import 'leaflet/dist/leaflet.css'

const CENTRO: [number, number] = [41.3056, -4.9148]

export function MapaLugares({ lugarInicial }: { lugarInicial?: string }) {
  const ahora = useAhora(30_000)
  const contenedor = useRef<HTMLDivElement>(null)
  const mapaRef = useRef<MapaLeaflet | null>(null)
  const capaRef = useRef<LayerGroup | null>(null)
  const [seleccionado, setSeleccionado] = useState<string | undefined>(lugarInicial)
  const [listo, setListo] = useState(false)

  const resumenes = useMemo(
    () => (ahora ? resumenLugares(ahora) : []),
    [ahora],
  )

  // Firma que cambia solo cuando cambia el estado de algún sitio,
  // para no repintar los marcadores cada segundo.
  const firma = resumenes
    .map((r) => `${r.lugar.id}:${r.enMarcha.length}`)
    .join('|')

  useEffect(() => {
    let cancelado = false

    async function iniciar() {
      if (!contenedor.current || mapaRef.current) return
      const L = (await import('leaflet')).default
      if (cancelado || !contenedor.current) return

      const mapa = L.map(contenedor.current, {
        center: CENTRO,
        zoom: 14,
        scrollWheelZoom: false,
      })
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
        maxZoom: 19,
      }).addTo(mapa)
      capaRef.current = L.layerGroup().addTo(mapa)
      mapaRef.current = mapa
      setListo(true)
    }

    iniciar()

    return () => {
      cancelado = true
      mapaRef.current?.remove()
      mapaRef.current = null
      capaRef.current = null
    }
  }, [])

  // Marcadores: se reconstruyen cuando cambia el estado en directo.
  useEffect(() => {
    if (!listo || !ahora) return
    let cancelado = false

    async function pintar() {
      const L = (await import('leaflet')).default
      const capa = capaRef.current
      if (cancelado || !capa) return
      capa.clearLayers()

      for (const { lugar, delDia, enMarcha, siguiente } of resumenes) {
        const activo = enMarcha.length > 0
        const referencia = enMarcha[0] ?? siguiente ?? delDia[0]
        const color = referencia ? getCategoria(referencia.categoria).color : '#6B7391'

        const modificador = activo
          ? ' marcador-lugar--activo'
          : referencia
            ? ''
            : ' marcador-lugar--apagado'

        const icono = L.divIcon({
          className: '',
          html: `<div class="marcador-lugar${modificador}" style="--pin:${color}"><span class="marcador-lugar__centro"></span></div>`,
          // El punto marca la coordenada, así que se ancla en su centro.
          iconSize: [30, 30],
          iconAnchor: [15, 15],
          popupAnchor: [0, -12],
        })

        const detalle = activo
          ? `<strong style="color:#A8232B">Ahora: ${enMarcha[0].titulo}</strong>`
          : siguiente
            ? `${formatoHora(inicioEvento(siguiente))} · ${siguiente.titulo}`
            : delDia.length > 0
              ? 'Ya ha terminado lo de hoy aquí'
              : 'Hoy no hay nada programado aquí'

        L.marker([lugar.lat, lugar.lng], { icon: icono, title: lugar.nombre })
          .bindPopup(
            `<div style="font-family:inherit"><div style="font-weight:600;margin-bottom:2px">${lugar.nombre}</div><div style="color:#6B7391">${detalle}</div></div>`,
          )
          .on('click', () => setSeleccionado(lugar.id))
          .addTo(capa)
      }
    }

    pintar()
    return () => {
      cancelado = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listo, firma])

  // Centrar en el sitio elegido desde otra pantalla o desde la lista.
  useEffect(() => {
    if (!listo || !seleccionado) return
    const r = resumenes.find((x) => x.lugar.id === seleccionado)
    if (r) mapaRef.current?.flyTo([r.lugar.lat, r.lugar.lng], 17, { duration: 0.7 })
  }, [listo, seleccionado, resumenes])

  const elegido = resumenes.find((r) => r.lugar.id === seleccionado)

  return (
    <div className="space-y-4">
      {/* `isolate` encierra los z-index de Leaflet (paneles 400, controles 1000)
          en su propio contexto, para que no se suban por encima de la cabecera. */}
      <div className="isolate overflow-hidden rounded-2xl border border-tinta/10">
        <div ref={contenedor} className="h-[320px] w-full sm:h-[400px]" />
      </div>

      {elegido && (
        <DetalleLugar
          resumen={elegido}
          ahora={ahora}
          onCerrar={() => setSeleccionado(undefined)}
        />
      )}

      <section>
        <h2 className="rotulo mb-2 text-[24px] text-tinta">Los sitios, ahora</h2>
        <ul className="space-y-1.5">
          {resumenes.map((r) => (
            <li key={r.lugar.id}>
              <button
                type="button"
                onClick={() => setSeleccionado(r.lugar.id)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition',
                  r.enMarcha.length > 0
                    ? 'border-grana/35 bg-panuelo'
                    : 'border-tinta/10 bg-panuelo hover:border-azul/30',
                  seleccionado === r.lugar.id && 'ring-2 ring-azul',
                )}
              >
                <span className="min-w-0 flex-1">
                  <span className="block text-[14px] font-medium text-tinta">
                    {r.lugar.nombre}
                  </span>
                  <span className="block truncate text-[12px] text-humo">
                    {r.enMarcha.length > 0
                      ? r.enMarcha[0].titulo
                      : r.siguiente
                        ? `${formatoHora(inicioEvento(r.siguiente))} · ${r.siguiente.titulo}`
                        : 'Sin actos hoy'}
                  </span>
                </span>
                {r.enMarcha.length > 0 ? (
                  <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-grana/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-grana">
                    <span className="h-1.5 w-1.5 animate-latido rounded-full bg-grana" />
                    En marcha
                  </span>
                ) : r.siguiente && ahora ? (
                  <span className="shrink-0 text-[11px] text-humo">
                    {cuentaAtras(inicioEvento(r.siguiente), ahora)}
                  </span>
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

function DetalleLugar({
  resumen,
  ahora,
  onCerrar,
}: {
  resumen: ResumenLugar
  ahora: Date | null
  onCerrar: () => void
}) {
  return (
    <section className="rounded-2xl border border-tinta/10 bg-panuelo p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-[16px] font-semibold text-tinta">
            {resumen.lugar.nombre}
          </h2>
          {resumen.lugar.direccion && (
            <p className="text-[12px] text-humo">{resumen.lugar.direccion}</p>
          )}
        </div>
        <button
          type="button"
          onClick={onCerrar}
          className="rounded-full px-2 py-1 text-[12px] text-humo hover:text-tinta"
        >
          Cerrar
        </button>
      </div>

      {resumen.delDia.length === 0 ? (
        <p className="mt-3 text-[13px] text-humo">Hoy no hay actos aquí.</p>
      ) : (
        <ol className="mt-3 space-y-2">
          {resumen.delDia.map((e) => (
            <li key={e.id}>
              <FichaEvento evento={e} ahora={ahora} detallado={false} />
            </li>
          ))}
        </ol>
      )}

      <a
        href={`https://www.google.com/maps/dir/?api=1&destination=${resumen.lugar.lat},${resumen.lugar.lng}`}
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-block rounded-full bg-tinta px-4 py-2 text-[13px] font-medium text-panuelo"
      >
        Cómo llegar
      </a>
    </section>
  )
}
