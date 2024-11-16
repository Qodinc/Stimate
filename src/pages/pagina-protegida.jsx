import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect } from "react"

export default function ProtectedPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  if (status === "loading") {
    return <div>Cargando...</div>
  }

  if (!session) {
    return null
  }

  return (
    <div>
      <h1>Página Protegida</h1>
      <p>Bienvenido, {session.user.name}</p>
    </div>
  )
}