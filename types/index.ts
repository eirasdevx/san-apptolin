export type CategoriaId =
  | 'encierro'
  | 'taurino'
  | 'musica'
  | 'penas'
  | 'infantil'
  | 'teatro'
  | 'tradicion'
  | 'deporte'
  | 'cultura'
  | 'fuegos'
  | 'hosteleria'
  | 'feria'
  | 'catola'

export interface Lugar {
  id: string
  nombre: string
  /** Cómo lo llama la gente, para la búsqueda */
  alias?: string[]
  direccion?: string
  lat: number
  lng: number
}

/** Parada de un recorrido con hora propia (rutas de charanga, pasacalles). */
export interface Parada {
  /** HH:MM en 24 h. */
  hora: string
  /** Cómo se anuncia la parada; si falta se usa el nombre del lugar. */
  nombre?: string
  /** Punto del mapa, cuando la parada es un sitio con ficha. */
  lugarId?: string
  detalle?: string
}

export interface Evento {
  id: string
  titulo: string
  /** Día del programa en formato YYYY-MM-DD. Lo que pasa de madrugada
   *  (antes de las 06:00) se guarda en el día de la noche a la que pertenece. */
  dia: string
  /** HH:MM en 24 h. */
  hora: string
  /** La hora es orientativa ("por la mañana", "a continuación"). */
  horaAprox?: boolean
  /** Duración estimada en minutos; si falta se calcula por categoría. */
  duracion?: number
  categoria: CategoriaId
  /** Punto del mapa. Se deja sin poner cuando el sitio aún no se sabe. */
  lugarId?: string
  /** Texto libre cuando el sitio no es un punto fijo o está por confirmar. */
  lugarTexto?: string
  descripcion?: string
  organiza?: string
  precio?: string
  recorrido?: string
  /** Paradas con hora del recorrido. La ficha se despliega al tocarla. */
  paradas?: Parada[]
  aviso?: string
  /** Los imprescindibles del día. */
  destacado?: boolean
}

export interface Permanente {
  id: string
  titulo: string
  desde: string
  hasta: string
  lugarId: string
  descripcion?: string
  detalle?: string[]
}

export type EstadoEvento = 'pasado' | 'ahora' | 'pronto' | 'futuro'
