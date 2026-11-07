import { getCategoria } from '@/lib/categorias'
import type { Evento, EstadoEvento, Parada } from '@/types'

/** Lo que empieza antes de esta hora pertenece a la noche del día anterior. */
const CORTE_MADRUGADA = 6

export const PRIMER_DIA = '2026-08-22'
export const DIA_UNO = '2026-09-01'
export const ULTIMO_DIA = '2026-09-08'

/** Minutos que consideramos "empieza pronto". */
export const VENTANA_PRONTO = 90

export function parseDia(dia: string): Date {
  const [y, m, d] = dia.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function claveDia(fecha: Date): string {
  const y = fecha.getFullYear()
  const m = String(fecha.getMonth() + 1).padStart(2, '0')
  const d = String(fecha.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/** Fecha y hora reales de un evento, resolviendo los actos de madrugada. */
export function inicioEvento(evento: Evento): Date {
  const fecha = parseDia(evento.dia)
  const [hh, mm] = evento.hora.split(':').map(Number)
  fecha.setHours(hh, mm, 0, 0)
  if (hh < CORTE_MADRUGADA) fecha.setDate(fecha.getDate() + 1)
  return fecha
}

export function duracionEvento(evento: Evento): number {
  return evento.duracion ?? getCategoria(evento.categoria).duracion
}

export function finEvento(evento: Evento): Date {
  return new Date(inicioEvento(evento).getTime() + duracionEvento(evento) * 60_000)
}

export function estadoEvento(evento: Evento, ahora: Date): EstadoEvento {
  const inicio = inicioEvento(evento).getTime()
  const fin = finEvento(evento).getTime()
  const t = ahora.getTime()
  if (t >= inicio && t < fin) return 'ahora'
  if (t >= fin) return 'pasado'
  if (inicio - t <= VENTANA_PRONTO * 60_000) return 'pronto'
  return 'futuro'
}

/** Hora real de una parada, resuelta sobre el día del evento. */
export function inicioParada(evento: Evento, parada: Parada): Date {
  return inicioEvento({ ...evento, hora: parada.hora })
}

/**
 * Parada por la que anda el recorrido ahora mismo, o -1 si todavía no ha
 * salido o ya se ha acabado.
 */
export function paradaActual(evento: Evento, ahora: Date): number {
  const paradas = evento.paradas
  if (!paradas?.length) return -1
  const t = ahora.getTime()
  if (t >= finEvento(evento).getTime()) return -1
  let indice = -1
  paradas.forEach((parada, i) => {
    if (inicioParada(evento, parada).getTime() <= t) indice = i
  })
  return indice
}

export function ordenarPorHora(eventos: Evento[]): Evento[] {
  return [...eventos].sort(
    (a, b) => inicioEvento(a).getTime() - inicioEvento(b).getTime(),
  )
}

/** Día del programa que corresponde a un instante dado (la noche cuenta como el día anterior). */
export function diaDelPrograma(ahora: Date): string {
  const referencia = new Date(ahora)
  if (referencia.getHours() < CORTE_MADRUGADA) {
    referencia.setDate(referencia.getDate() - 1)
  }
  return claveDia(referencia)
}

/**
 * Día de programa actual según la hora de Medina del Campo, independientemente
 * de la zona horaria del servidor. Lo usa el programa para abrirse por el día
 * de hoy sin depender del navegador.
 */
export function diaDelProgramaEnMedina(ahora = new Date()): string {
  const formato = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Madrid',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    hour12: false,
  })
  const partes = Object.fromEntries(
    formato.formatToParts(ahora).map((p) => [p.type, p.value]),
  )
  const fecha = new Date(
    Number(partes.year),
    Number(partes.month) - 1,
    Number(partes.day),
  )
  if (Number(partes.hour) % 24 < CORTE_MADRUGADA) {
    fecha.setDate(fecha.getDate() - 1)
  }
  return claveDia(fecha)
}

/** Todos los días con programa, del 22 de agosto al 8 de septiembre. */
export function diasDelPrograma(): string[] {
  const dias: string[] = []
  const cursor = parseDia(PRIMER_DIA)
  const fin = parseDia(ULTIMO_DIA)
  while (cursor <= fin) {
    dias.push(claveDia(cursor))
    cursor.setDate(cursor.getDate() + 1)
  }
  return dias
}

/** Número de día de fiestas (1-8) o null si todavía estamos en prefiestas. */
export function numeroDiaFiesta(dia: string): number | null {
  const diff = Math.round(
    (parseDia(dia).getTime() - parseDia(DIA_UNO).getTime()) / 86_400_000,
  )
  return diff >= 0 && diff <= 7 ? diff + 1 : null
}

export function esPrefiesta(dia: string): boolean {
  return numeroDiaFiesta(dia) === null
}

const DIAS_SEMANA = [
  'domingo',
  'lunes',
  'martes',
  'miércoles',
  'jueves',
  'viernes',
  'sábado',
]
const MESES = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
]

export function nombreDia(dia: string): string {
  const f = parseDia(dia)
  return `${DIAS_SEMANA[f.getDay()]} ${f.getDate()} de ${MESES[f.getMonth()]}`
}

export function diaCorto(dia: string): { semana: string; numero: string; mes: string } {
  const f = parseDia(dia)
  return {
    semana: DIAS_SEMANA[f.getDay()].slice(0, 3),
    numero: String(f.getDate()),
    mes: MESES[f.getMonth()].slice(0, 3),
  }
}

export function formatoHora(fecha: Date): string {
  return `${String(fecha.getHours()).padStart(2, '0')}:${String(
    fecha.getMinutes(),
  ).padStart(2, '0')}`
}

/** «en 2 h 15 min», «en 40 min», «ahora mismo». */
export function cuentaAtras(destino: Date, ahora: Date): string {
  const minutos = Math.round((destino.getTime() - ahora.getTime()) / 60_000)
  if (minutos <= 0) return 'ahora mismo'
  if (minutos < 60) return `en ${minutos} min`
  const horas = Math.floor(minutos / 60)
  const resto = minutos % 60
  if (horas < 24) {
    return resto ? `en ${horas} h ${resto} min` : `en ${horas} h`
  }
  const dias = Math.floor(horas / 24)
  return dias === 1 ? 'mañana' : `en ${dias} días`
}

/** Desglose para el marcador de cuenta atrás grande. */
export function desgloseCuentaAtras(destino: Date, ahora: Date) {
  const total = Math.max(0, Math.floor((destino.getTime() - ahora.getTime()) / 1000))
  return {
    dias: Math.floor(total / 86_400),
    horas: Math.floor((total % 86_400) / 3600),
    minutos: Math.floor((total % 3600) / 60),
    segundos: total % 60,
  }
}

/** Porcentaje recorrido del evento, para la barra de progreso en directo. */
export function progresoEvento(evento: Evento, ahora: Date): number {
  const inicio = inicioEvento(evento).getTime()
  const fin = finEvento(evento).getTime()
  if (ahora.getTime() <= inicio) return 0
  if (ahora.getTime() >= fin) return 100
  return Math.round(((ahora.getTime() - inicio) / (fin - inicio)) * 100)
}
