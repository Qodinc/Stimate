import '../styles/globals.css'; // Aquí importas tus estilos globales
import 'react-toastify/dist/ReactToastify.css'; 
import { SessionProvider } from "next-auth/react"
import { ToastContainer } from 'react-toastify';


function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <ToastContainer position="bottom-right" autoClose={2000} />
    </SessionProvider>
  )
}

export default MyApp;