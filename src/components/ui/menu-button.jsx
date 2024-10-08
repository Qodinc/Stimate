import React, { useState, useRef, useEffect } from 'react';
import Trash from '../Icons/Trash';
import Edit from '../Icons/Edit';

const MenuButton = ({ onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-8 h-8 flex items-center justify-center rounded-full bg-accent transition-colors hover:bg-lightAccent hover:border-lightAccent border-accent focus:outline-none"
      >
        <span className="text-white pb-3 font-bold text-lg">...</span>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <button
              onClick={() => { onEdit(); setIsOpen(false); }}
              className="flex gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
              role="menuitem"
            >
            <Edit width={20} height={20} stroke="#2F27CE" />
              Editar
            </button>
            <button
              onClick={() => { onDelete(); setIsOpen(false); }}
              className="flex gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
              role="menuitem"
            >
            <Trash width={20} height={20} stroke="#2F27CE" />
              Eliminar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuButton;