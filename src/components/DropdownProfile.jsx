import React, { useState } from 'react';
import {ReactComponent as IconLogOut} from '../assets/icons/cerrarSesion.svg'

/* Este componente es una copia de Dropdown solo que aqui añadiremos los iconos svg para las opciones y prepararemos
la imagen de perfil, esto con el fin de usarse para un navbar, tambien usaremos aqui mismo el arreglo de opciones */

//Modo de uso al final(abajo) de este codigo


const dropdownOptions = [
    { icon: '🏠', text: "Suscripción" },
    { icon: <IconLogOut className="w-5 h-5" />, text: "Mi Opción Personalizada" },
  ];

const DropdownProfile = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>▼</span>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {dropdownOptions.map((option, index) => (
              <a
                key={index}
                href="#"
                className="block px-4 py-2 text-base text-[#050315] hover:bg-[#F4F4F5] hover:text-gray-900"
                role="menuitem"
              >
                <span className="flex items-center">
                  <span className="mr-2">{option.icon}</span>
                  <span>{option.text}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownProfile;

// Se importa y despues se crean las opciones para despues llamarlas 
/* import Dropdown from "@/components/Dropdown";

const dropdownOptions = [
  { icon: '🏠', text: "Suscripción" },
  { icon: '⚙️', text: "Cerrar Sesión" },
];

export default function Home() {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
        <main className="text-center">
          <h1 className="text-5xl font-bold text-gray-800">
            Welcome to Next.js!
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Get started by editing <code className="bg-gray-200 p-1 rounded">pages/index.jsx</code>
          </p>

          <Dropdown options={dropdownOptions} />
        </main>
      </div>
    );
  } */