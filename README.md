# San Apptolín

**🌐 En directo:** [san-apptolin.netlify.app](https://san-apptolin.netlify.app/) · Next.js · TypeScript · Tailwind CSS · Leaflet

Guía en directo de las **Ferias y Fiestas de San Antolín 2026** de Medina del Campo.
Inspirada en la forma de trabajar de Andestaran (Pamplona): lo primero que ves no es
el programa entero, es **qué está pasando ahora mismo y dónde**.

Del 22 de agosto al 8 de septiembre de 2026 · Fiestas de Interés Turístico Nacional.

---

## Arrancar el proyecto

```bash
npm install
npm run dev      # http://localhost:3000
```

Otros comandos:

```bash
npm run build      # compilación de producción
npm start          # servir la compilación
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
```

No hay backend, ni base de datos, ni variables de entorno. Todo el programa vive en
`lib/data/`, así que el despliegue en Vercel, Netlify o cualquier hosting de Node es
directo: conectar el repo y desplegar.

## Qué hace

| Pantalla | Ruta | Qué resuelve |
|---|---|---|
| **Ahora** | `/` | Reloj en directo, día de fiestas, lo que está en marcha, lo que empieza en menos de 90 min, lo que queda del día y cuenta atrás al próximo encierro (o al día 1 si aún no han empezado). |
| **Programa** | `/programa` | Los 18 días en tira horizontal, filtro por categoría, buscador sin tildes, filtro «solo míos» y actividades permanentes. |
| **Mapa** | `/mapa` | Los sitios sobre OpenStreetMap, resaltados si tienen algo en marcha, con el programa del día de cada uno y enlace a «Cómo llegar». |
| **Lo mío** | `/mio` | Tus favoritos agrupados por día, con cuenta atrás del siguiente. |
| **Avisos** | `/info` | Teléfonos de urgencia y recomendaciones de Protección Civil para encierros, fuegos y correcalles. |

El día y la categoría del programa viajan en la URL (`/programa?dia=2026-09-02&cat=encierro`),
así que un enlace concreto se puede compartir por WhatsApp y abre exactamente esa vista.
Los favoritos se guardan en `localStorage`: sin cuentas, sin registro, sin servidor.

## Estructura

```
app/
├── layout.tsx           # cabecera, navegación inferior, fuentes, PWA
├── page.tsx             # Ahora
├── programa/page.tsx    # server component: lee dia y cat de la URL
├── mapa/page.tsx
├── mio/page.tsx
└── info/page.tsx
components/
├── agenda/              # FichaEvento, ListaDia, SelectorDias, FiltroCategorias, MisPlanes
├── inicio/PanelAhora    # la pantalla en directo
├── layout/              # Cabecera y BarraInferior
└── mapa/MapaLugares     # Leaflet cargado en cliente
hooks/
├── useAhora             # reloj en vivo, null en SSR para evitar hydration mismatch
└── useFavoritos         # localStorage + sincronización entre pestañas
lib/
├── data/eventos.ts      # ← el programa completo
├── data/lugares.ts      # ← los sitios y sus coordenadas
├── data/permanentes.ts  # ← actividades permanentes, teléfonos y consejos
├── categorias.ts        # colores, símbolos y duración por defecto
├── tiempo.ts            # estados en directo, días, cuentas atrás
└── agenda.ts            # qué pasa en cada lugar ahora mismo
```

## Cómo tocarlo

### Ajustar las coordenadas del mapa

**Esto es lo primero que conviene hacer.** Las coordenadas de `lib/data/lugares.ts` son
aproximadas al centro de Medina del Campo. Para afinar una: abre el sitio en Google Maps,
haz clic derecho sobre el punto exacto, copia las coordenadas y sustituye `lat` y `lng`.
Las que más lo piden son la Plaza de Toros, el Recinto de Peñas y la pista de moto-cross.

### Cambiar o añadir un acto

Todos los actos son objetos en `lib/data/eventos.ts`:

```ts
{
  id: '02-encierro',          // único, no se repite
  titulo: 'Primer Encierro Tradicional al Estilo de la Villa',
  dia: '2026-09-02',          // día del programa
  hora: '09:00',              // 24 h
  duracion: 120,              // minutos; si falta, se usa la de la categoría
  categoria: 'encierro',
  lugarId: 'plaza-toros',     // debe existir en lugares.ts
  aviso: 'Aviso con tres bombas de mortero: 8:55, 8:58 y 9:00.',
  destacado: true,
}
```

Campos opcionales: `descripcion`, `organiza`, `precio`, `recorrido`, `lugarTexto`
(para recorridos sin punto fijo) y `horaAprox` (para los «por la mañana»).

**Los actos de madrugada** se guardan en el día de la noche a la que pertenecen: la
Discomovida de las 00:00 del día 6 lleva `dia: '2026-09-06'` y `hora: '00:00'`.
`lib/tiempo.ts` le suma el día real al calcular la hora (todo lo anterior a las 06:00).

### Añadir una categoría

En `lib/categorias.ts`, junto a su color, símbolo y duración por defecto, y añade el id
en `CategoriaId` (`types/index.ts`). Aparece sola en los filtros y en el mapa.

## Decisiones técnicas

- **Server Components por defecto.** Solo llevan `'use client'` los componentes que
  necesitan reloj, `localStorage` o Leaflet.
- **Sin hydration mismatch.** `useAhora` devuelve `null` en el primer render y en el
  HTML del servidor; la hora solo existe una vez montado en el navegador.
- **El día por defecto del programa** se calcula en el servidor con `Europe/Madrid`
  (`diaDelProgramaEnMedina`), así que da igual en qué zona horaria esté desplegado.
- **Leaflet se importa dentro de `useEffect`**, no con `next/dynamic`: no hay problemas
  de SSR y no hace falta clave de API ni servicio de mapas de pago.
- **Marcadores con `divIcon`**, para esquivar el clásico problema de las rutas de los
  iconos de Leaflet con bundlers.
- Las **fuentes** se cargan con `<link>` en el layout en lugar de `next/font`, para que
  la compilación no dependa de descargar Google Fonts.

## Diseño

Sale del cartel oficial de 2026: cobalto sobre crema, con el pañuelo blanco anudado.

- **Colores**: `tinta` #0A1740 (azul noche), `azul` #1B44B8 (cobalto del cartel),
  `papel` #EFE9DA, `panuelo` #FBFAF6, `grana` #A8232B (divisa, para lo que está en
  directo) y `oro` #E8A31D (bandera de señalización, para los avisos).
- **Tipografía**: Big Shoulders Display para rótulos (alta y condensada, como el
  «SAN ANTOLIN» del cartel), Instrument Sans para el texto y DM Mono para las horas.
- **La firma**: el nudo del pañuelo, la marca de grana que en la lista del día separa
  lo que ya has vivido de lo que te queda por vivir.

## Pendiente / ideas

- Notificaciones push antes de los actos guardados (requiere service worker propio).
- El recorrido del encierro dibujado como polilínea sobre el mapa.
- Fichas de las ganaderías de cada encierro (divisa, señal, finca) — los datos están
  en el PDF del programa.
- Modo offline completo con service worker: la app ya es casi estática.

---

Datos tomados del programa oficial editado por el Excmo. Ayuntamiento de Medina del
Campo. Los horarios pueden cambiar: la app avisa de que conviene confirmar en los
canales oficiales.
