import type { Metadata } from 'next'
import { MapaLugares } from '@/components/mapa/MapaLugares'
import { LUGARES_POR_ID } from '@/lib/data/lugares'

export const metadata: Metadata = {
  title: 'Mapa · San Apptolin',
  description: 'Dónde está pasando cada cosa en San Antolín 2026.',
}

export default async function MapaPage({
  searchParams,
}: {
  searchParams: Promise<{ lugar?: string }>
}) {
  const { lugar } = await searchParams
  const inicial = lugar && LUGARES_POR_ID.has(lugar) ? lugar : undefined

  return (
    <div className="space-y-4">
      <div>
        <h1 className="rotulo text-[38px] text-tinta sm:text-[46px]">Mapa</h1>
        <p className="mt-1 text-sm text-humo">
          Los sitios con algo en marcha aparecen resaltados. Toca un punto para ver su
          programa de hoy.
        </p>
      </div>
      <MapaLugares lugarInicial={inicial} />
    </div>
  )
}
