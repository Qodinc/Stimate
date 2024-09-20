import React, { useState } from 'react';

const dropdownOptions = [
  { icon: '🏠', text: "Suscripción" },
  { icon: '⚙️', text: "Cerrar Sesión" },
];

const Dropdown = ({ options }) => {
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
            {options.map((option, index) => (
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

export default Dropdown;