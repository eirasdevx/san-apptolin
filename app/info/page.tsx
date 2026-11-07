import type { Metadata } from 'next'
import { Phone } from 'lucide-react'
import {
  CONSEJOS_CORRECALLES,
  CONSEJOS_ENCIERRO,
  CONSEJOS_FUEGOS,
  TELEFONOS,
} from '@/lib/data/permanentes'

export const metadata: Metadata = {
  title: 'Avisos y teléfonos · San Apptolin',
  description:
    'Programa emitido por el Excmo. Ayuntamiento de Medina del Campo, avisos y créditos de San Apptolin.',
}

export default function InfoPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="rotulo text-[38px] text-tinta sm:text-[46px]">
          Avisos y teléfonos
        </h1>
        <p className="mt-1 text-sm text-humo">
          Recomendaciones del Servicio Municipal de Protección Civil.
        </p>
      </div>

      <section className="rounded-2xl bg-tinta p-4 text-panuelo">
        <h2 className="rotulo text-[24px]">Si necesitas ayuda</h2>
        <ul className="mt-3 divide-y divide-panuelo/10">
          {TELEFONOS.map((t) => (
            <li key={t.numero} className="flex items-center justify-between gap-3 py-2.5">
              <span className="text-[13px] text-panuelo/80">{t.nombre}</span>
              <a
                href={`tel:${t.numero.replace(/\s/g, '')}`}
                className="flex shrink-0 items-center gap-1.5 rounded-full bg-panuelo px-3 py-1.5 font-mono text-[13px] font-medium text-tinta"
              >
                <Phone className="h-3.5 w-3.5" />
                {t.numero}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-tinta/10 bg-panuelo p-4">
        <h2 className="rotulo text-[24px] text-tinta">Programa y autoría</h2>
        <p className="mt-2 text-[13px] leading-relaxed text-tinta/75">
          El programa mostrado en esta aplicación es el programa emitido por el
          Excmo. Ayuntamiento de Medina del Campo para las Ferias y Fiestas de
          San Antolín 2026.
        </p>
        <p className="mt-2 text-[13px] leading-relaxed text-tinta/75">
          Esta web ha sido creada por la Cuadrilla La Catola con &quot;eiras.devx&quot;.
        </p>
      </section>

      <Consejos titulo="Encierros" items={CONSEJOS_ENCIERRO} />
      <Consejos titulo="Fuegos artificiales" items={CONSEJOS_FUEGOS} />
      <Consejos titulo="Correcalles de fuego del día 4" items={CONSEJOS_CORRECALLES} />

      <section className="rounded-2xl border border-tinta/10 bg-panuelo p-4">
        <h2 className="rotulo text-[24px] text-tinta">Por unas fiestas sin agresiones</h2>
        <p className="mt-2 text-[13px] leading-relaxed text-tinta/75">
          Todas y todos tenemos derecho a divertirnos. Ante cualquier agresión sexual,
          llama al 112, a la Policía Local (983 800 659), a la Policía Nacional (091) o
          al 016 de atención a la mujer.
        </p>
      </section>
    </div>
  )
}

function Consejos({ titulo, items }: { titulo: string; items: string[] }) {
  return (
    <section className="rounded-2xl border border-tinta/10 bg-panuelo p-4">
      <h2 className="rotulo text-[24px] text-tinta">{titulo}</h2>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 text-[13px] leading-relaxed text-tinta/80">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-oro" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
