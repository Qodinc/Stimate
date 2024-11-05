import React, { useState, useEffect } from 'react';
import LogOut from './Icons/LogOut';
import Paywall from './Icons/Paywall';
import Link from 'next/link';
import { signOut, useSession } from "next-auth/react";

const DropdownProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    // Confirmamos si existen datos de usuario en la sesión en todos los inicios de sesión
    if (session) {
      console.log("Datos de sesión del usuario:", session.user);
    }
  }, [session]);

  if (!session) {
    return null; // No muestra nada si no hay sesión
  }

  // Función para obtener la imagen del perfil
  const getProfileImage = () => {
    // Comprobamos si hay una imagen de perfil
    if (session.user.image || session.user.picture) {
      return session.user.image || session.user.picture;
    }

    // Si no hay imagen ni datos de usuario, usar un avatar predeterminado
    const seed = session.user.email || session.user.name || "default-seed";
    return `https://avatars.dicebear.com/api/avataaars/${encodeURIComponent(seed)}.svg`;
  };

  const dropdownOptions = [
    { 
      href: '/planes', 
      icon: <Paywall width={25} height={25} fill="#2F27CE" />, 
      text: 'Suscripción' 
    },
    {
      onClick: () => signOut({ callbackUrl: '/iniciar-sesion' }),
      icon: <LogOut width={20} height={20} fill="#2F27CE" />,
      text: 'Cerrar Sesión',
    }
  ];

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-gray-300 shadow-sm bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          <img 
            src={getProfileImage()} // Usa la función para obtener la imagen
            alt={session.user.name || "User Avatar"} 
            className="w-full h-full rounded-full object-cover"
            onError={(e) => {
              // Si hay error, usa un avatar predeterminado
              e.target.src = `https://avatars.dicebear.com/api/avataaars/default-seed.svg`;
            }}
          />
        </button>
      </div>

      {isOpen && (
        <div className="font-comfortaa text-sm origin-top-right absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {/* Información del usuario */}
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900 truncate">
                {session.user.name || "Usuario"}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {session.user.email || "Correo no disponible"}
              </p>
            </div>
            
            {/* Opciones del dropdown */}
            {dropdownOptions.map((option, index) => (
              <Link
                key={index}
                href={option.href || '#'}
                onClick={option.onClick}
                className="block px-4 py-2 text-base text-[#050315] hover:bg-[#F4F4F5] hover:text-gray-900"
                role="menuitem"
              >
                <span className="flex items-center">
                  <span className="mr-2">{option.icon}</span>
                  <span>{option.text}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownProfile;
