import type { Metadata } from 'next'
import Image from 'next/image'
import { ListaDia } from '@/components/agenda/ListaDia'
import { CATOLA_EVENTOS } from '@/lib/data/catola'
import { nombreDia, ordenarPorHora } from '@/lib/tiempo'

export const metadata: Metadata = {
  title: 'La Catola · San Apptolin',
  description: 'Programación de la Cuadrilla La Catola para San Antolín 2026.',
}

const DIAS_CATOLA = Array.from(new Set(CATOLA_EVENTOS.map((e) => e.dia))).sort()

export default function CatolaPage() {
  return (
    <div className="space-y-5">
      <section className="overflow-hidden rounded-3xl bg-tinta text-panuelo">
        <div className="flex items-center justify-between gap-4 px-5 py-6 sm:px-7 sm:py-8">
          <div>
            <p className="etiqueta text-celeste">Cuadrilla La Catola</p>
            <h1 className="rotulo mt-2 text-[44px] leading-[0.9] sm:text-[64px]">
              Programa
              <br />
              de La Catola
            </h1>
          </div>
          <Image
            src="/logos/la-catola.png"
            alt="Cuadrilla La Catola"
            width={116}
            height={176}
            priority
            className="h-28 w-auto shrink-0 sm:h-40"
          />
        </div>
      </section>

      {DIAS_CATOLA.map((dia) => (
        <section key={dia} className="space-y-3">
          <div>
            <h2 className="rotulo text-[30px] text-tinta">{nombreDia(dia)}</h2>
            <p className="mt-1 text-[13px] text-humo">
              Programación propia de la Cuadrilla La Catola.
            </p>
          </div>
          <ListaDia
            dia={dia}
            eventos={ordenarPorHora(CATOLA_EVENTOS.filter((e) => e.dia === dia))}
          />
        </section>
      ))}
    </div>
  )
}
