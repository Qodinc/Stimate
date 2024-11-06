// pages/404.jsx
import Link from 'next/link'

export default function Custom404() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          {/* Ícono de error usando emojis o puedes usar un SVG */}
          <div className="text-7xl mb-4">
            😕
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            404 - Página no encontrada
          </h1>
          
          <p className="text-gray-600 mb-8">
            La página que estás buscando parece que se ha perdido en el espacio. 
            ¿Quizás fue movida o nunca existió?
          </p>
          
          <div className="space-y-4">
            <Link 
              href="/" 
              className="inline-block w-full sm:w-auto bg-blue-500 text-white px-8 py-3 rounded-md hover:bg-blue-600 transition-colors font-medium"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}