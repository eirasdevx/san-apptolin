import { getCategoria } from '@/lib/categorias'
import { cn } from '@/lib/utils'
import type { CategoriaId } from '@/types'

export function PildoraCategoria({
  categoria,
  className,
}: {
  categoria: CategoriaId
  className?: string
}) {
  const cat = getCategoria(categoria)
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2 py-[3px] text-[11px] font-medium',
        cat.pildora,
        className,
      )}
    >
      <span aria-hidden>{cat.simbolo}</span>
      {cat.nombre}
    </span>
  )
}
