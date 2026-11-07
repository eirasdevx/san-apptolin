import type { Evento } from '@/types'

export const CATOLA_EVENTOS: Evento[] = [
  {
    // El id se queda como está: es la clave con la que se guardan los favoritos.
    id: 'catola-02-san-quintolin',
    titulo: 'Ruta San Quintolín',
    descripcion:
      'Ruta del altavoz errante por Medina, en colaboración con 24H de Lebars.',
    dia: '2026-09-02',
    hora: '16:00',
    duracion: 360,
    categoria: 'catola',
    lugarId: 'plaza-mayor',
    lugarTexto: 'Empieza en la Plaza Mayor',
    recorrido:
      'Plaza Mayor · Zamorano · Yovoy · Cervecería Baviera · Pink · Arizona 66',
    paradas: [
      {
        hora: '16:00',
        nombre: 'Plaza Mayor',
        lugarId: 'plaza-mayor',
        detalle: 'Inicio de la ruta',
      },
      { hora: '17:00', nombre: 'Zamorano', lugarId: 'zamorano' },
      { hora: '18:00', nombre: 'Yovoy', lugarId: 'yovoy' },
      { hora: '19:00', nombre: 'Cervecería Baviera', lugarId: 'cerveceria-baviera' },
      { hora: '20:00', nombre: 'Pink', lugarId: 'bar-pink' },
      { hora: '21:00', nombre: 'Arizona 66', lugarId: 'arizona-66' },
      {
        hora: '22:00',
        nombre: 'Fin de ruta y entrega de premios',
        detalle: 'Premios de las 24H de Lebars',
      },
    ],
    organiza: 'Cuadrilla La Catola · 24H de Lebars',
    destacado: true,
  },
  {
    id: 'catola-03-apertura-kole',
    titulo: 'Apertura del local',
    descripcion: 'Apertura de La Kole, el local de la Cuadrilla, para socios.',
    dia: '2026-09-03',
    hora: '13:00',
    duracion: 60,
    categoria: 'catola',
    lugarId: 'la-kole',
    lugarTexto: 'La Kole (local de la Cuadrilla), junto al Arizona 66',
    organiza: 'Cuadrilla La Catola',
  },
  {
    id: 'catola-03-comida-kole',
    titulo: 'Comida, concurso de bota y torneo de beerpong',
    descripcion:
      'Comida en La Kole. Después habrá concurso de bota y torneo de beerpong.',
    dia: '2026-09-03',
    hora: '14:00',
    horaAprox: true,
    duracion: 180,
    categoria: 'catola',
    lugarId: 'la-kole',
    lugarTexto: 'La Kole (local de la Cuadrilla), junto al Arizona 66',
    organiza: 'Cuadrilla La Catola',
    destacado: true,
  },
  {
    id: 'catola-03-charanga-bares',
    titulo: 'Ruta de la charanga',
    descripcion:
      "La Charanga Jaleo recorre cuatro bares con la Cuadrilla: Arizona 66, Pink, Purgatorio y Coco's.",
    dia: '2026-09-03',
    hora: '16:45',
    horaAprox: true,
    duracion: 240,
    categoria: 'catola',
    lugarId: 'arizona-66',
    lugarTexto: "Arizona 66, Pink, Purgatorio y Coco's",
    recorrido: "Arizona 66 · Pink · Purgatorio · Coco's",
    paradas: [
      { hora: '16:45', nombre: 'Arizona 66', lugarId: 'arizona-66' },
      { hora: '17:30', nombre: 'Pink', lugarId: 'bar-pink' },
      { hora: '18:15', nombre: 'Purgatorio', lugarId: 'purgatorio' },
      { hora: '19:05', nombre: "Coco's", lugarId: 'cocos-aventuras' },
    ],
    organiza: 'Cuadrilla La Catola · Charanga Jaleo (Nava de la Asunción)',
    aviso: 'Todos los horarios son aproximaciones.',
    destacado: true,
  },
]
