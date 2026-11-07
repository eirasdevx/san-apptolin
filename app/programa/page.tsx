import type { Metadata } from 'next'
import { FiltroCategorias } from '@/components/agenda/FiltroCategorias'
import { ListaDia } from '@/components/agenda/ListaDia'
import { SelectorDias } from '@/components/agenda/SelectorDias'
import { CATEGORIAS_POR_ID } from '@/lib/categorias'
import { PERMANENTES } from '@/lib/data/permanentes'
import { nombreLugar } from '@/lib/data/lugares'
import { TODOS_EVENTOS } from '@/lib/data/todos-eventos'
import {
  diaDelProgramaEnMedina,
  diasDelPrograma,
  nombreDia,
  numeroDiaFiesta,
  parseDia,
} from '@/lib/tiempo'
import type { CategoriaId } from '@/types'

export const metadata: Metadata = {
  title: 'Programa · San Apptolin',
  description: 'Programa completo de San Antolín 2026, día a día.',
}

const DIAS = diasDelPrograma()

export default async function ProgramaPage({
  searchParams,
}: {
  searchParams: Promise<{ dia?: string; cat?: string }>
}) {
  const params = await searchParams
  const hoy = diaDelProgramaEnMedina()
  const porDefecto = DIAS.includes(hoy) ? hoy : DIAS[0]
  const dia = params.dia && DIAS.includes(params.dia) ? params.dia : porDefecto
  const cat =
    params.cat && CATEGORIAS_POR_ID.has(params.cat as CategoriaId)
      ? (params.cat as CategoriaId)
      : undefined

  const delDia = TODOS_EVENTOS.filter((e) => e.dia === dia)
  const disponibles = new Set<CategoriaId>(delDia.map((e) => e.categoria))
  const eventos = cat ? delDia.filter((e) => e.categoria === cat) : delDia

  const numero = numeroDiaFiesta(dia)
  const fecha = parseDia(dia)
  const permanentes = PERMANENTES.filter(
    (p) => parseDia(p.desde) <= fecha && fecha <= parseDia(p.hasta),
  )

  return (
    <div className="space-y-5">
      <div>
        <h1 className="rotulo text-[38px] text-tinta sm:text-[46px]">Programa</h1>
        <p className="mt-1 text-sm text-humo">
          {nombreDia(dia)}
          {numero ? ` · día ${numero} de fiestas` : ' · prefiestas'}
        </p>
      </div>

      <SelectorDias dia={dia} cat={cat} />
      <FiltroCategorias dia={dia} cat={cat} disponibles={disponibles} />

      {delDia.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-tinta/20 px-4 py-8 text-center text-sm text-humo">
          Este día no tiene actos en el programa oficial. Las casetas de la Feria de
          Calle siguen abiertas.
        </p>
      ) : (
        <ListaDia eventos={eventos} dia={dia} />
      )}

      {permanentes.length > 0 && (
        <section className="pt-2">
          <h2 className="rotulo mb-2 text-[24px] text-tinta">Abierto todos los días</h2>
          <ul className="space-y-2">
            {permanentes.map((p) => (
              <li
                key={p.id}
                className="rounded-2xl border border-tinta/10 bg-panuelo p-4"
              >
                <h3 className="text-[15px] font-semibold text-tinta">{p.titulo}</h3>
                <p className="mt-1 text-[12px] text-humo">
                  {nombreLugar(p.lugarId)}
                </p>
                {p.descripcion && (
                  <p className="mt-2 text-[13px] leading-relaxed text-tinta/75">
                    {p.descripcion}
                  </p>
                )}
                {p.detalle && (
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {p.detalle.map((d) => (
                      <li
                        key={d}
                        className="rounded-full bg-tinta/5 px-2.5 py-1 text-[11px] text-tinta/70"
                      >
                        {d}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
