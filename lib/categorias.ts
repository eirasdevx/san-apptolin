import type { CategoriaId } from '@/types'

export interface Categoria {
  id: CategoriaId
  nombre: string
  /** Emoji del marcador del mapa y de las fichas. */
  simbolo: string
  /** Clases de Tailwind para la píldora de categoría. */
  pildora: string
  /** Color sólido (hex) para el mapa. */
  color: string
  /** Duración por defecto en minutos cuando el evento no la indica. */
  duracion: number
}

export const CATEGORIAS: Categoria[] = [
  {
    id: 'encierro',
    nombre: 'Encierros',
    simbolo: '🐂',
    pildora: 'bg-grana/10 text-grana border-grana/25',
    color: '#A8232B',
    duracion: 60,
  },
  {
    id: 'taurino',
    nombre: 'Taurino',
    simbolo: '🎪',
    pildora: 'bg-grana/10 text-grana border-grana/25',
    color: '#C4553B',
    duracion: 120,
  },
  {
    id: 'musica',
    nombre: 'Música',
    simbolo: '🎤',
    pildora: 'bg-azul/10 text-azul border-azul/25',
    color: '#6D2B8E',
    duracion: 90,
  },
  {
    id: 'penas',
    nombre: 'Peñas',
    simbolo: '🥁',
    pildora: 'bg-oro/15 text-[#8A5D06] border-oro/40',
    color: '#E8A31D',
    duracion: 120,
  },
  {
    id: 'infantil',
    nombre: 'Infantil',
    simbolo: '🎈',
    pildora: 'bg-celeste/15 text-azul border-celeste/40',
    color: '#B56AE8',
    duracion: 120,
  },
  {
    id: 'teatro',
    nombre: 'Teatro de calle',
    simbolo: '🔥',
    pildora: 'bg-grana/10 text-grana border-grana/25',
    color: '#8E2F6B',
    duracion: 60,
  },
  {
    id: 'tradicion',
    nombre: 'Tradición',
    simbolo: '🤍',
    pildora: 'bg-tinta/10 text-tinta border-tinta/20',
    color: '#241132',
    duracion: 60,
  },
  {
    id: 'deporte',
    nombre: 'Deporte',
    simbolo: '🏃',
    pildora: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/25',
    color: '#0F766E',
    duracion: 90,
  },
  {
    id: 'cultura',
    nombre: 'Cultura',
    simbolo: '📽️',
    pildora: 'bg-tinta/10 text-tinta border-tinta/20',
    color: '#4B2564',
    duracion: 90,
  },
  {
    id: 'fuegos',
    nombre: 'Fuegos',
    simbolo: '🎆',
    pildora: 'bg-oro/15 text-[#8A5D06] border-oro/40',
    color: '#D97706',
    duracion: 30,
  },
  {
    id: 'hosteleria',
    nombre: 'Bares y casetas',
    simbolo: '🍺',
    pildora: 'bg-humo/10 text-humo border-humo/25',
    color: '#6B7391',
    duracion: 180,
  },
  {
    id: 'feria',
    nombre: 'Feria',
    simbolo: '🎡',
    pildora: 'bg-celeste/15 text-azul border-celeste/40',
    color: '#B56AE8',
    duracion: 300,
  },
  {
    id: 'catola',
    nombre: 'La Catola',
    simbolo: '👑',
    pildora: 'bg-oro/15 text-[#6D2B8E] border-oro/50',
    color: '#6D2B8E',
    duracion: 180,
  },
]

export const CATEGORIAS_POR_ID = new Map(CATEGORIAS.map((c) => [c.id, c]))

export function getCategoria(id: CategoriaId): Categoria {
  return CATEGORIAS_POR_ID.get(id) ?? CATEGORIAS[6]
}
