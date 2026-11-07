import Link from 'next/link'

export default function NoEncontrado() {
  return (
    <div className="py-16 text-center">
      <h1 className="rotulo text-[52px] text-tinta">Esta calle no lleva a la plaza</h1>
      <p className="mt-3 text-sm text-humo">
        La página que buscas no existe. Vuelve al programa y sigue la charanga.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-full bg-tinta px-5 py-2.5 text-sm font-medium text-panuelo"
      >
        Ir a lo que pasa ahora
      </Link>
    </div>
  )
}
