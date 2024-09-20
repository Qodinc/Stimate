import React, { useState, useCallback, useMemo } from 'react';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import xCircle from '../../public/Icons/x-circle.svg'

/**
 * Componente MultipleSelect
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {string} props.className - Clases CSS adicionales.
 * @param {Array<{value: string, text: string}>} props.options - Las opciones disponibles, cada una debe tener un valor y texto.
 * @param {function} props.onChange - Función que se ejecuta cuando se selecciona una opción.
 * @param {string} [props.label] - Etiqueta opcional para el selector.
 * @param {string} [props.labelAddNew] - Etiqueta opcional para el texto que se mostrará para agregar un nuevo elemento a la lista. Si no se asigan un valor, no se podrá agregar más elementos a las opciones.
 */
const MultipleSelect = ({ 
   className="w-full font-comfortaa max-w-3xl text-base text-baseColor", 
   selectedOptionsClass="bg-accent100 text-slate-900 px-3 py-2 gap-1 rounded-3xl", 
   optionsClass="flex items-center px-3 py-2 rounded-3xl hover:bg-gray-100 cursor-pointer", 
   options, 
   onChange, 
   label, 
   labelAddNew="Add",
   iconRemove=xCircle 
}) => {
   const [selectedOptions, setSelectedOptions] = useState([]);
   const [isOpen, setIsOpen] = useState(false);
   const [inputValue, setInputValue] = useState('');
   const [allOptions, setAllOptions] = useState(options);

   const filteredOptions = useMemo(() => {
      return allOptions.filter(
         (option) =>
            option.text.toLowerCase().includes(inputValue.toLowerCase()) 
            && !selectedOptions.some(selected => selected.value === option.value)
      );
   }, [allOptions, inputValue, selectedOptions]);

   const handleInputChange = useCallback((e) => {
      setInputValue(e.target.value);
      setIsOpen(true);
   }, []);

   const handleOptionClick = useCallback((option) => {
      setSelectedOptions((prev) => {
         const newSelectedOptions = [...prev, option];
         onChange(newSelectedOptions);
         return newSelectedOptions;
      });
      setInputValue('');
      setIsOpen(false);
   }, [onChange]);

   const handleRemoveOption = useCallback((optionToRemove) => {
      setSelectedOptions((prev) => {
         const newSelectedOptions = prev.filter((option) => option.value !== optionToRemove.value);
         onChange(newSelectedOptions);
         return newSelectedOptions;
      });
   }, [onChange]);

   const toggleList = () => {
      setIsOpen(!isOpen);
   };

   const handleAddNewOption = () => {
      if (inputValue.trim() !== '') {
         const newOption = {
            value: `new-${inputValue.trim().toLowerCase().replace(" ", "-")}`,
            text: inputValue.trim()
         };
         
         const optionExists = allOptions.some(option => option.text.toLowerCase() === newOption.text.toLowerCase());

         if (!optionExists) {
            setAllOptions(prev => [...prev, newOption]);
            handleOptionClick(newOption);
         }
      }
   };

   return (
      <div className={className}>
         {label && <label className="mb-2">{label}</label>}
         <div className="relative">
            <div 
               className="flex flex-wrap gap-2 p-3 border border-gray-300 rounded-3xl bg-white cursor-pointer"
               onClick={toggleList}
            >
               {selectedOptions.map((option) => (
                  <span
                     key={option.value}
                     className={`flex items-center ${selectedOptionsClass}`}
                  >
                     {option.text}
                     <button
                        onClick={(e) => {
                           e.stopPropagation();
                           handleRemoveOption(option);
                        }}
                        className="ml-1"
                     >
                        <Image
                           src={iconRemove}
                           alt=""
                           width={16}
                           height={16}
                        />
                     </button>
                  </span>
               ))}
               <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onClick={toggleList}
                  className="flex-grow outline-none"
                  placeholder="Search or add option..."
               />
            </div>
            {isOpen && (
               <ul className="absolute z-10 w-full mt-1 p-2 bg-white border border-gray-300 rounded-3xl shadow-lg max-h-60 overflow-auto">
                  {filteredOptions.map((option) => (
                     <li
                        key={option.value}
                        onClick={() => handleOptionClick(option)}
                        className={optionsClass}
                     >
                        {option.text}
                     </li>
                  ))}
                  {labelAddNew && inputValue.trim() !== '' && (
                     <li
                        onClick={handleAddNewOption}
                        className={optionsClass}
                     >
                        <Plus className="mr-2 h-4 w-4 text-blue-600" />
                        {labelAddNew} {`"${inputValue}"`}
                     </li>
                  )}
               </ul>
            )}
         </div>
      </div>
   );
};

export default MultipleSelect;