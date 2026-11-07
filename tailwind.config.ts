import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        tinta: '#241132',      // morado noche de la app
        azul: '#6D2B8E',       // morado principal
        celeste: '#B56AE8',    // lavanda de apoyo
        papel: '#EFE9DA',      // papel del programa
        panuelo: '#FBFAF6',    // blanco del pañuelo
        grana: '#A8232B',      // divisa
        oro: '#E8A31D',        // bandera de señalización del encierro
        humo: '#6B7391',
        verde: '#16A34A',     // el día de hoy en el selector
      },
      fontFamily: {
        display: ['"Big Shoulders Display"', 'Impact', 'sans-serif'],
        sans: ['"Instrument Sans"', 'system-ui', 'sans-serif'],
        mono: ['"DM Mono"', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        latido: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '.45', transform: 'scale(.82)' },
        },
        subir: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        latido: 'latido 1.8s ease-in-out infinite',
        subir: 'subir .45s cubic-bezier(.2,.7,.3,1) both',
      },
    },
  },
  plugins: [],
}

export default config
