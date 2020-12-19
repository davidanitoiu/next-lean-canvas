import type { AppProps } from 'next/app';
import "styles/globals.css";
import "tailwindcss/tailwind.css";
import '@animxyz/core'

declare module 'react' {
  interface HTMLAttributes<T> {
    xyz?: string
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
