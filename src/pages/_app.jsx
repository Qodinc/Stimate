import '../styles/globals.css'; // Aquí importas tus estilos globales
import { SessionProvider } from "next-auth/react"


function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp;