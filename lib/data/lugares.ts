import type { Lugar } from '@/types'

/**
 * Puntos del mapa de San Antolín.
 *
 * Coordenadas afinadas con referencias públicas de mapas, direcciones oficiales
 * y ubicaciones de los recintos. Los puntos de calles o recorridos marcan una
 * zona representativa, no una puerta exacta.
 */
export const LUGARES: Lugar[] = [
  {
    id: 'plaza-mayor',
    nombre: 'Plaza Mayor de la Hispanidad',
    alias: ['plaza mayor', 'la plaza'],
    lat: 41.30857,
    lng: -4.91502,
  },
  {
    id: 'plaza-toros',
    nombre: 'Plaza de Toros',
    alias: ['coso del arrabal', 'toros'],
    direccion: 'Coso del Arrabal',
    lat: 41.30269,
    lng: -4.92244,
  },
  {
    id: 'recinto-penas',
    nombre: 'Recinto de Peñas',
    alias: ['cuartel', 'explanada'],
    direccion: 'Explanada del Antiguo Cuartel Marqués de la Ensenada',
    lat: 41.30407,
    lng: -4.91183,
  },
  {
    id: 'castillo-mota',
    nombre: 'Castillo de la Mota',
    alias: ['la mota', 'dando la mota'],
    lat: 41.30909,
    lng: -4.90853,
  },
  {
    id: 'colegiata',
    nombre: 'Iglesia Colegiata de San Antolín',
    alias: ['la colegiata', 'atrio'],
    lat: 41.30762,
    lng: -4.91539,
  },
  {
    id: 'palacio-testamentario',
    nombre: 'Palacio Real Testamentario',
    alias: ['testamentario', 'isabel la católica'],
    lat: 41.30813,
    lng: -4.91608,
  },
  {
    id: 'ayuntamiento',
    nombre: 'Ayuntamiento',
    alias: ['casa consistorial', 'salón de plenos', 'balcón'],
    direccion: 'Plaza Mayor de la Hispanidad',
    lat: 41.3079,
    lng: -4.91567,
  },
  {
    id: 'recinto-ferial',
    nombre: 'Recinto Ferial',
    alias: ['feria', 'carruseles', 'atracciones', 'josé zorrilla'],
    direccion: 'Recinto Ferial y c/ José Zorrilla',
    lat: 41.30711,
    lng: -4.91973,
  },
  {
    id: 'moto-cross',
    nombre: 'Pista de Moto-Cross',
    alias: ['fuegos', 'pirotecnia'],
    direccion: 'Junto al Estadio Municipal de Atletismo',
    lat: 41.29675,
    lng: -4.9136,
  },
  {
    id: 'estadio',
    nombre: 'Estadio Municipal',
    alias: ['fútbol', 'gimnástica'],
    lat: 41.29705,
    lng: -4.91215,
  },
  {
    id: 'parque-villa-ferias',
    nombre: 'Parque Villa de las Ferias',
    alias: ['villa de las ferias'],
    lat: 41.30415,
    lng: -4.90954,
  },
  {
    id: 'plaza-mercado',
    nombre: 'Plaza del Mercado',
    alias: ['bar pink', 'la rana'],
    lat: 41.3082632,
    lng: -4.9132327,
  },
  {
    id: 'simon-ruiz',
    nombre: 'Hospital Simón Ruiz',
    alias: ['simón ruiz', 'videomapping'],
    lat: 41.3047,
    lng: -4.91959,
  },
  {
    id: 'plaza-segovia',
    nombre: 'Plaza de Segovia',
    alias: ['segovia', 'macrodiscoteca'],
    lat: 41.3062954,
    lng: -4.915451,
  },
  {
    id: 'parque-aguacaballos',
    nombre: 'Parque Aguacaballos',
    alias: ['calva'],
    lat: 41.30741,
    lng: -4.90934,
  },
  {
    id: 'turismo',
    nombre: 'Oficina Municipal de Turismo',
    alias: ['turismo', 'carteles'],
    lat: 41.30855,
    lng: -4.91465,
  },
  {
    id: 'plaza-ensenada',
    nombre: 'Plaza Marqués de la Ensenada',
    alias: ['la bonita', 'ensenada'],
    lat: 41.3103414,
    lng: -4.9169859,
  },
  {
    // Comparte acera con el Arizona 66; el punto va unos metros al lado para que
    // los dos marcadores no se pisen en el mapa.
    id: 'la-kole',
    nombre: 'La Kole',
    alias: ['la kole', 'kole', 'el local', 'local de la cuadrilla'],
    direccion: 'Calle de La Antigua, junto al Arizona 66',
    lat: 41.3070022,
    lng: -4.9138588,
  },
  {
    id: 'arizona-66',
    nombre: 'Arizona 66 Café y Copas',
    alias: ['arizona 66', 'arizona'],
    direccion: 'Calle Antigua, 4',
    lat: 41.3070022,
    lng: -4.9137888,
  },
  {
    id: 'bar-pink',
    nombre: 'Bar Pink',
    alias: ['pink', 'pink sport bar'],
    direccion: 'Plaza del Mercado, 1',
    lat: 41.3082717,
    lng: -4.9134709,
  },
  {
    id: 'cerveceria-baviera',
    nombre: 'Cervecería Baviera',
    alias: ['baviera', 'cerve'],
    direccion: 'Calle de Simón Ruiz, 10',
    lat: 41.3075402,
    lng: -4.9141547,
  },
  {
    id: 'yovoy',
    nombre: 'Cafetería Yovoy',
    alias: ['yovoy', 'yoyoy'],
    direccion: 'Calle del Almirante, 8',
    lat: 41.3086222,
    lng: -4.9160351,
  },
  {
    id: 'zamorano',
    nombre: 'Bar Zamorano',
    alias: ['zamorano', 'el zamorano'],
    direccion: 'Calle de Bernal Díaz del Castillo, 5',
    lat: 41.309372,
    lng: -4.9153785,
  },
  {
    // La calle no está en OpenStreetMap: la coordenada sale de la ficha pública
    // del bar, así que cae en el portal pero puede bailar unos metros.
    id: 'purgatorio',
    nombre: 'Bar Purgatorio',
    alias: ['purgatorio', 'el purgatorio'],
    direccion: 'Calle Padre Suárez de la Concha, 2',
    lat: 41.3074208,
    lng: -4.9120687,
  },
  {
    id: 'cocos-aventuras',
    nombre: "Coco's Bar de Aventuras",
    alias: ["coco's", 'cocos', 'coco'],
    direccion: 'Ronda de Santa Ana, 21',
    lat: 41.3061626,
    lng: -4.9141781,
  },
  {
    id: 'calle-carreras',
    nombre: 'Calle Carreras',
    alias: ['encierro ecológico'],
    lat: 41.3046313,
    lng: -4.9169069,
  },
  {
    id: 'ronda-santa-ana',
    nombre: 'Ronda de Santa Ana',
    alias: ["coco's", 'moyo', 'gallery'],
    lat: 41.3063769,
    lng: -4.9138921,
  },
  {
    id: 'las-farolas',
    nombre: 'Calle Las Farolas',
    alias: ['boulevard', 'lucio'],
    lat: 41.3060673,
    lng: -4.911995,
  },
  {
    id: 'plaza-carmen',
    nombre: 'Plaza del Carmen',
    alias: ['carrozas', 'desfile'],
    lat: 41.30571,
    lng: -4.91486,
  },
  {
    id: 'calle-bravo',
    nombre: 'Calle Bravo',
    alias: ['la gramola'],
    lat: 41.3073086,
    lng: -4.9153449,
  },
  {
    id: 'calle-almirante',
    nombre: 'Calle Almirante',
    lat: 41.3086618,
    lng: -4.9162891,
  },
  {
    id: 'avenida-portugal',
    nombre: 'Avenida de Portugal',
    alias: ['bueyada', 'chiqui cabestros'],
    lat: 41.3036296,
    lng: -4.9204234,
  },
  {
    id: 'el-chopal',
    nombre: 'El Chopal',
    lat: 41.3042,
    lng: -4.9092,
  },
]

export const LUGARES_POR_ID = new Map(LUGARES.map((l) => [l.id, l]))

export function getLugar(id: string): Lugar | undefined {
  return LUGARES_POR_ID.get(id)
}

export function nombreLugar(id: string): string {
  return LUGARES_POR_ID.get(id)?.nombre ?? 'Medina del Campo'
}
