import { SliderBares } from '@/components/catola/SliderBares'
import { PanelAhora } from '@/components/inicio/PanelAhora'
import { eventosDeLugar } from '@/lib/agenda'
import { BARES_COLABORADORES } from '@/lib/data/bares'
import { diaCorto, formatoHora, inicioEvento } from '@/lib/tiempo'
import type { Evento } from '@/types'

/**
 * «jue 3 · 18:15 · Ruta de la charanga»: lo primero que hace el bar. Si el acto
 * es un recorrido, vale la hora a la que llega a ese bar, no la de la salida.
 */
function adelantoDe(evento: Evento, lugarId: string): string {
  const parada = evento.paradas?.find((p) => p.lugarId === lugarId)
  const hora = parada?.hora ?? formatoHora(inicioEvento(evento))
  const { semana, numero } = diaCorto(evento.dia)
  return `${semana} ${numero} · ${hora} · ${evento.titulo}`
}

const BARES = BARES_COLABORADORES.map((bar) => {
  const suyos = eventosDeLugar(bar.id)
  const primero = suyos[0]
  return {
    ...bar,
    actos: suyos.length,
    adelanto: primero ? adelantoDe(primero, bar.id) : undefined,
  }
})

export default function Page() {
  return (
    <div className="space-y-8">
      <PanelAhora />
      <SliderBares bares={BARES} />
    </div>
  )
}
