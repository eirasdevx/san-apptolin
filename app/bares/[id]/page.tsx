import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, MapPin } from 'lucide-react'
import { LogoBar } from '@/components/bares/LogoBar'
import { ProgramaBar } from '@/components/bares/ProgramaBar'
import { eventosDeLugar } from '@/lib/agenda'
import { BARES_COLABORADORES, BARES_POR_ID } from '@/lib/data/bares'
import { getLugar } from '@/lib/data/lugares'

export function generateStaticParams() {
  return BARES_COLABORADORES.map((bar) => ({ id: bar.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const bar = BARES_POR_ID.get(id)
  if (!bar) return { title: 'Bar · San Apptolin' }
  return {
    title: `${bar.nombre} · San Apptolin`,
    description: `Lo que organiza ${bar.nombre} en San Antolín 2026.`,
  }
}

export default async function BarPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const bar = BARES_POR_ID.get(id)
  if (!bar) notFound()

  const lugar = getLugar(bar.id)
  const eventos = eventosDeLugar(bar.id)

  return (
    <div className="space-y-5">
      <Link
        href="/catola"
        className="inline-flex items-center gap-1.5 text-[13px] text-humo transition hover:text-azul"
      >
        <ArrowLeft className="h-4 w-4" />
        Programa de La Catola
      </Link>

      <section className="overflow-hidden rounded-3xl bg-tinta text-panuelo">
        <div className="relative grid h-40 place-items-center px-6 sm:h-52">
          <LogoBar
            src={bar.logo}
            nombre={bar.nombre}
            prioritario
            className="p-6"
            tamanoTexto="text-[40px] sm:text-[52px]"
          />
        </div>
        <div className="border-t border-panuelo/10 px-5 py-4 sm:px-7">
          <p className="etiqueta text-celeste">Colabora con La Catola</p>
          <h1 className="rotulo mt-1 text-[36px] leading-none sm:text-[46px]">
            {bar.nombre}
          </h1>
          {lugar?.direccion && (
            <p className="mt-1 text-[13px] text-panuelo/70">{lugar.direccion}</p>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href={`/mapa?lugar=${bar.id}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-panuelo px-4 py-2 text-[13px] font-medium text-tinta"
            >
              <MapPin className="h-4 w-4" />
              Ver en el mapa
            </Link>
            {lugar && (
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${lugar.lat},${lugar.lng}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-panuelo/25 px-4 py-2 text-[13px] font-medium text-panuelo"
              >
                Cómo llegar
              </a>
            )}
          </div>
        </div>
      </section>

      <div>
        <p className="etiqueta mb-3 text-humo">
          {eventos.length} {eventos.length === 1 ? 'acto' : 'actos'} en el programa
        </p>
        <ProgramaBar eventos={eventos} />
      </div>
    </div>
  )
}
