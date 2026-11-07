export interface BarColaborador {
  /** Coincide con el id del sitio en lugares.ts, para el mapa y su programa. */
  id: string
  nombre: string
  /** Logo en /public/logos/bares. Se ve sobre fondo oscuro. */
  logo: string
}

/**
 * En el orden en que se pisan: primero la ruta San Quintolín del día 2 y
 * después los que añade la ruta de la charanga del día 3.
 */
export const BARES_COLABORADORES: BarColaborador[] = [
  { id: 'zamorano', nombre: 'Zamorano', logo: '/logos/bares/logo_zamorano.png' },
  { id: 'yovoy', nombre: 'Yovoy', logo: '/logos/bares/logo_yovvoy.png' },
  {
    id: 'cerveceria-baviera',
    nombre: 'Cervecería Baviera',
    logo: '/logos/bares/logo_cerve.png',
  },
  { id: 'bar-pink', nombre: 'Pink Sport Bar', logo: '/logos/bares/logo_pink.png' },
  { id: 'arizona-66', nombre: 'Arizona 66', logo: '/logos/bares/logo_arizona_66.png' },
  { id: 'purgatorio', nombre: 'Purgatorio', logo: '/logos/bares/logo_purga.png' },
  { id: 'cocos-aventuras', nombre: "Coco's", logo: '/logos/bares/logo_cocos_bar_avventuras.png' },
]

export const BARES_POR_ID = new Map(BARES_COLABORADORES.map((b) => [b.id, b]))
