'use client'

import { useEffect, useState } from 'react'

/**
 * Reloj en directo. Devuelve `null` en el primer render (y en el HTML del
 * servidor) para que cliente y servidor pinten lo mismo y no haya
 * hydration mismatch: la hora solo existe una vez montado en el navegador.
 */
export function useAhora(intervaloMs = 1000): Date | null {
  const [ahora, setAhora] = useState<Date | null>(null)

  useEffect(() => {
    setAhora(new Date())
    const id = setInterval(() => setAhora(new Date()), intervaloMs)
    return () => clearInterval(id)
  }, [intervaloMs])

  return ahora
}
