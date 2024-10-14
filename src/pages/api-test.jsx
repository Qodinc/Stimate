import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import authenticatedRequest from "@/api/authenticatedRequest"

export default function ProtectedPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [data, setData] = useState(null)

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login")
  }, [status, router])

  useEffect(() => {
    if (session) {
      authenticatedRequest("http://localhost:8080/")
        .then(setData)
        .catch(console.error)
    }
  }, [session])

  if (status === "loading") return <p>Cargando...</p>
  if (!session) return null

  return (
    <div>
      <h1>Contenido protegido</h1>
      {data && <p>Datos del servidor: {JSON.stringify(data)}</p>}
    </div>
  )
}