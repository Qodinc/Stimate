import { useSession, signOut } from "next-auth/react"
// import ButtonGoogle from "@/components/ui/ButtonGoogle"

export default function TestPage() {
  const { data: session } = useSession()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md">
        {session ? (
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Bienvenido, {session.user.name}</h1>
            <img
              src={session.user.image}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <p className="mb-4">{session.user.email}</p>
            <button
              onClick={() => signOut()}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Cerrar sesión
            </button>
          </div>
        ) : (
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Iniciar sesión</h1>
            {/* <ButtonGoogle /> */}
          </div>
        )}
      </div>
    </div>
  )
}