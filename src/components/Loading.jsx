import Head from "next/head";

export default function Loading() {
   return <>
      <Head>
         <title>Cargando...</title>
      </Head>
      <div className="h-screen flex justify-center items-center font-comfortaa bg-white">
         Cargando...
      </div>;
   </>
}