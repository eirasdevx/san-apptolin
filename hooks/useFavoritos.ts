'use client'

import { useCallback, useEffect, useState } from 'react'

const CLAVE = 'san-apptolin:favoritos'
const EVENTO_CAMBIO = 'san-apptolin:favoritos-cambio'
const DURACION_COOKIE = 60 * 60 * 24 * 400

function normalizar(valor: unknown): string[] {
  if (!Array.isArray(valor)) return []
  return Array.from(new Set(valor.filter((id): id is string => typeof id === 'string')))
}

function leerJsonSeguro(valor: string | null): string[] {
  if (!valor) return []
  try {
    return normalizar(JSON.parse(valor))
  } catch {
    return []
  }
}

function leerCookie(): string[] {
  if (typeof document === 'undefined') return []
  const prefijo = `${CLAVE}=`
  const encontrada = document.cookie
    .split('; ')
    .find((parte) => parte.startsWith(prefijo))

  if (!encontrada) return []

  try {
    return leerJsonSeguro(decodeURIComponent(encontrada.slice(prefijo.length)))
  } catch {
    return []
  }
}

function escribirCookie(favoritos: string[]) {
  if (typeof document === 'undefined') return
  document.cookie = `${CLAVE}=${encodeURIComponent(
    JSON.stringify(favoritos),
  )}; Max-Age=${DURACION_COOKIE}; Path=/; SameSite=Lax`
}

function leer(): string[] {
  if (typeof window === 'undefined') return []
  const deLocalStorage = leerJsonSeguro(window.localStorage.getItem(CLAVE))
  const deCookie = leerCookie()
  return normalizar([...deLocalStorage, ...deCookie])
}

function guardar(favoritos: string[]) {
  const normalizados = normalizar(favoritos)
  window.localStorage.setItem(CLAVE, JSON.stringify(normalizados))
  escribirCookie(normalizados)
}

/**
 * Favoritos guardados en el propio móvil. Se sincronizan entre componentes
 * con un evento propio, y entre pestañas con el evento `storage`.
 */
export function useFavoritos() {
  const [favoritos, setFavoritos] = useState<string[]>([])
  const [listo, setListo] = useState(false)

  useEffect(() => {
    const iniciales = leer()
    guardar(iniciales)
    setFavoritos(iniciales)
    setListo(true)

    const sincronizar = () => {
      const siguientes = leer()
      guardar(siguientes)
      setFavoritos(siguientes)
    }
    window.addEventListener(EVENTO_CAMBIO, sincronizar)
    window.addEventListener('storage', sincronizar)
    return () => {
      window.removeEventListener(EVENTO_CAMBIO, sincronizar)
      window.removeEventListener('storage', sincronizar)
    }
  }, [])

  const alternar = useCallback((id: string) => {
    const actuales = leer()
    const siguientes = actuales.includes(id)
      ? actuales.filter((x) => x !== id)
      : [...actuales, id]
    guardar(siguientes)
    window.dispatchEvent(new Event(EVENTO_CAMBIO))
  }, [])

  const esFavorito = useCallback(
    (id: string) => favoritos.includes(id),
    [favoritos],
  )

  return { favoritos, esFavorito, alternar, listo }
}
