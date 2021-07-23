
import type { AppProps } from 'next/app'

import '../styles/globals.css'

function NetinstApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default NetinstApp
