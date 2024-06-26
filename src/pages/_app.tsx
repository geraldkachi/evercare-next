import 'animate.css';
import '@/styles/custom.css'
import '@/styles/variables.css'
import '@/styles/tailwind.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
        <Component {...pageProps} />
  )
}

export default MyApp
