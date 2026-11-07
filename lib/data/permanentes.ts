import type { Permanente } from '@/types'

export const PERMANENTES: Permanente[] = [
  {
    id: 'feria-calle',
    titulo: 'Feria de Calle',
    desde: '2026-08-21',
    hasta: '2026-09-08',
    lugarId: 'plaza-mayor',
    descripcion:
      'Casetas de hostelería en la zona de la Plaza Mayor. Las casetas pueden permanecer cerradas, de forma opcional, del 21 al 28 de agosto.',
    detalle: [
      'La Gramola',
      'Boulevard',
      'La Vieja Estación',
      'Las Morcillas de la Juana',
      'El Canario',
      'La Mejillonera',
      'Gallery',
      'Purgatorio',
      'La Flor Medinense',
    ],
  },
  {
    id: 'exposicion-carteles',
    titulo: 'Exposición de carteles anunciadores',
    desde: '2026-08-28',
    hasta: '2026-09-08',
    lugarId: 'turismo',
    descripcion:
      'Carteles oficiales anunciadores de San Antolín en la Oficina Municipal de Turismo.',
  },
  {
    id: 'feria-carruseles',
    titulo: 'Mercadillo y Feria de Carruseles',
    desde: '2026-08-28',
    hasta: '2026-09-08',
    lugarId: 'recinto-ferial',
    descripcion: 'Recinto Ferial y calle José Zorrilla.',
    detalle: [
      'El Día del Niño hay descuentos en las atracciones.',
      'Una hora antes de abrir la feria hay un tramo sin música para niños con autismo y necesidades especiales.',
    ],
  },
]

export const TELEFONOS = [
  { nombre: 'Emergencias', numero: '112' },
  { nombre: 'Centro de coordinación (encierros y espectáculos)', numero: '983 80 06 59' },
  { nombre: 'Policía Local', numero: '983 800 659' },
  { nombre: 'Policía Nacional', numero: '091' },
  { nombre: 'Atención a la mujer', numero: '016' },
]

export const CONSEJOS_FUEGOS = [
  'Los espectáculos pirotécnicos son los días 1 y 8 de septiembre a las 22:30 h, en la pista de moto-cross junto al Estadio Municipal de Atletismo.',
  'Llega unos 15 minutos antes. La mejor vista está a 200 metros de distancia o más.',
  'Respeta las barreras de seguridad y las indicaciones de la organización.',
  'Si cae ceniza en los ojos, enjuaga con agua abundante y no te restriegues.',
  'Si encuentras un componente sin explotar, no lo toques ni lo muevas: avisa a la Policía, Protección Civil o Bomberos.',
  'Deja a las mascotas en casa: las explosiones les resultan muy desagradables, sobre todo a los perros.',
]

export const CONSEJOS_CORRECALLES = [
  'El recorrido es Gamazo, Rafael Giraldo, Artillería, Plaza del Carmen, Portillo de San Juan de la Cruz, Plaza Segovia, Bravo y Plaza Mayor.',
  'Si vas a participar, ponte ropa de algodón de manga larga, prenda vaquera y gorra. Tapones en los oídos y gafas para los ojos.',
  'No acudas con carritos de bebé ni subas a los niños a hombros: el fuego va a la altura de sus ojos.',
  'Si se te prende la ropa, tírate al suelo y da vueltas. No corras.',
  'No pidas agua a los vecinos: moja la pólvora y hace que explote en lugar de quemarse.',
  'Prohibido aparcar en las calles del recorrido desde las 15:00 h hasta el final del espectáculo.',
]

export const CONSEJOS_ENCIERRO = [
  'Los encierros tradicionales son los días 2, 4, 6 y 8 de septiembre a las 9:00 h, avisados con tres bombas de mortero a las 8:55, 8:58 y 9:00.',
  'Puntos de atención policial: Camino de Velascálvaro, Carreras esquina con Artillería, Avenida de Portugal esquina con Costado del Hospital, y la puerta de entrada al encierro en la Plaza de Toros.',
  'Atención sanitaria: detrás del doble vallado en Camino de Velascálvaro y en Calle Artillería, y en la enfermería de la Plaza de Toros.',
  'Si una res se escapa en el campo, suenan campanas de dos en dos durante medio minuto, repitiéndose cada cinco. Si se escapa en zona urbana, el repique es continuo durante treinta segundos, cada tres minutos.',
  'Prohibido estacionar en la zona de seguridad desde tres horas antes de cada festejo.',
  'El atalancado de madera no es zona para espectadores: es una barrera para dirigir la manada.',
]
