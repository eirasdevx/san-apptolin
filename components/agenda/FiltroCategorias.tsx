import Link from 'next/link'
import { CATEGORIAS } from '@/lib/categorias'
import { cn } from '@/lib/utils'
import type { CategoriaId } from '@/types'

export function FiltroCategorias({
  dia,
  cat,
  disponibles,
}: {
  dia: string
  cat?: CategoriaId
  disponibles: Set<CategoriaId>
}) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex gap-1.5 pb-1">
        <Link
          href={{ pathname: '/programa', query: { dia } }}
          className={cn(
            'shrink-0 rounded-full border px-3 py-1.5 text-[12px] font-medium transition',
            !cat
              ? 'border-tinta bg-tinta text-panuelo'
              : 'border-tinta/15 bg-panuelo text-humo hover:border-azul/40',
          )}
        >
          Todo
        </Link>
        {CATEGORIAS.filter((c) => disponibles.has(c.id)).map((c) => (
          <Link
            key={c.id}
            href={{ pathname: '/programa', query: { dia, cat: c.id } }}
            className={cn(
              'shrink-0 rounded-full border px-3 py-1.5 text-[12px] font-medium transition',
              cat === c.id
                ? 'border-tinta bg-tinta text-panuelo'
                : 'border-tinta/15 bg-panuelo text-tinta hover:border-azul/40',
            )}
          >
            <span aria-hidden className="mr-1">
              {c.simbolo}
            </span>
            {c.nombre}
          </Link>
        ))}
      </div>
    </div>
  )
}
