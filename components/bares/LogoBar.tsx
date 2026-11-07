'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

/**
 * Los logos van sobre fondo oscuro. Mientras no esté el archivo en
 * /public/logos/bares, se cae al nombre rotulado y no se ve una imagen rota.
 */
export function LogoBar({
  src,
  nombre,
  prioritario = false,
  className,
  tamanoTexto = 'text-[34px] sm:text-[42px]',
}: {
  src: string
  nombre: string
  prioritario?: boolean
  className?: string
  tamanoTexto?: string
}) {
  const [roto, setRoto] = useState(false)

  if (roto) {
    return (
      <span className={cn('rotulo text-center text-panuelo', tamanoTexto)}>
        {nombre}
      </span>
    )
  }

  return (
    <Image
      src={src}
      alt={nombre}
      fill
      sizes="(max-width: 640px) 90vw, 640px"
      priority={prioritario}
      className={cn('object-contain', className)}
      onError={() => setRoto(true)}
    />
  )
}
