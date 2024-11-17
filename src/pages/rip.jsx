import Head from "next/head"
import Link from "next/link"

export default function RipSantiago() {
    const title = "En memoria a Santiago"
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <Link href="/" className="flex flex-col items-center justify-center h-screen">
                <img src="Icons/ripsantiago.jpg" alt="santiago" className="object-cover w-[25%] rounded-full" />
                <h1 className="text-4xl font-bold italic text-accent">
                    {title}
                </h1>
            </Link>
        </>
    )
}