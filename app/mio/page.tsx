import type { Metadata } from 'next'
import { MisPlanes } from '@/components/agenda/MisPlanes'

export const metadata: Metadata = {
  title: 'Lo mío · San Apptolin',
  description: 'Los actos de San Antolín que has guardado.',
}

export default function MioPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="rotulo text-[38px] text-tinta sm:text-[46px]">Lo mío</h1>
        <p className="mt-1 text-sm text-humo">
          Tu San Antolín, en el orden en que va a pasar.
        </p>
      </div>
      <MisPlanes />
    </div>
  )
}
