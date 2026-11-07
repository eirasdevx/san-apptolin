import { LUGARES } from '@/lib/data/lugares'
import { TODOS_EVENTOS } from '@/lib/data/todos-eventos'
import { diaDelPrograma, estadoEvento, inicioEvento, ordenarPorHora } from '@/lib/tiempo'
import type { Evento, Lugar } from '@/types'

export interface ResumenLugar {
  lugar: Lugar
  /** Actos de ese lugar en el día de programa actual. */
  delDia: Evento[]
  enMarcha: Evento[]
  siguiente?: Evento
}

/**
 * Qué se cuece en cada sitio en este momento: lo que está pasando y lo
 * siguiente que va a pasar. Los lugares sin nada hoy quedan al final.
 */
export function resumenLugares(ahora: Date): ResumenLugar[] {
  const dia = diaDelPrograma(ahora)

  return LUGARES.map((lugar) => {
    const delDia = ordenarPorHora(
      TODOS_EVENTOS.filter((e) => e.lugarId === lugar.id && e.dia === dia),
    )
    const enMarcha = delDia.filter((e) => estadoEvento(e, ahora) === 'ahora')
    const siguiente = delDia.find((e) => inicioEvento(e) > ahora)
    return { lugar, delDia, enMarcha, siguiente }
  }).sort((a, b) => {
    if (a.enMarcha.length !== b.enMarcha.length) {
      return b.enMarcha.length - a.enMarcha.length
    }
    if (a.siguiente && b.siguiente) {
      return inicioEvento(a.siguiente).getTime() - inicioEvento(b.siguiente).getTime()
    }
    if (a.siguiente) return -1
    if (b.siguiente) return 1
    return b.delDia.length - a.delDia.length
  })
}

/**
 * Todo lo que se organiza en un sitio a lo largo de las fiestas. Cuenta también
 * los recorridos que paran ahí, aunque el acto esté fichado en otro lugar.
 */
export function eventosDeLugar(lugarId: string): Evento[] {
  return ordenarPorHora(
    TODOS_EVENTOS.filter(
      (e) => e.lugarId === lugarId || e.paradas?.some((p) => p.lugarId === lugarId),
    ),
  )
}
