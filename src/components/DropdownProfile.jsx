import React, { useState } from 'react';
import LogOut from './Icons/LogOut';
import Paywall from './Icons/Paywall';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useSession } from "next-auth/react";


const DropdownProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  if (!session) {
    return null; // O renderiza un componente de "no autenticado"
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: '/iniciar-sesion' });
  };

  const dropdownOptions = [
    { href: '/planes', icon: <Paywall width={25} height={25} fill="#2F27CE" />, text: 'Suscripción' },
    {
      onClick: () => handleSignOut(), // Aquí agregas la función de cierre de sesión
      icon: <LogOut width={20} height={20} fill="#2F27CE" />,
      text: 'Cerrar Sesión',
    },
  ];

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-gray-300 shadow-sm  bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          <img src={session.user.image} alt={session.user.name} className="w-full h-full rounded-full object-cover"  />
        </button>
      </div>

      {isOpen && (
        <div className="font-comfortaa text-sm origin-top-right absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {dropdownOptions.map((option, index) => (
              <Link
                key={index}
                href={option.href || '#'}
                onClick={option.onClick} // Agregamos la propiedad onClick si existe
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
