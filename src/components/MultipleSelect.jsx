import React, { useState, useCallback, useMemo } from 'react';
import { PlusCircle } from 'lucide-react';
import XCircle from './Icons/XCircle';

/**
 * Componente MultipleSelect
 * 
 * @param {Array<{value: string, text: string}>} props.options - *Lista de opciones disponibles, cada opción debe tener la estructura objeto {value: string, text: string}.
 * @param {function} props.onChange - *Función que se ejecuta cuando se selecciona una opción.
 * @param {string} [props.label] - *Etiqueta opcional para el selector. (opcional)
 * @param {string} props.className - Clases CSS personalizadas. (opcional)
 * @param {string} props.selectedOptionsClass - Clases CSS personalizadas para las opciones seleccionadoas. (opcional)
 * @param {string} props.optionsClass - Clases CSS personalizadas para las opciones. (opcional)
 * @param {string} [props.labelAddNew] - Etiqueta opcional para el texto que se mostrará para agregar un nuevo elemento a la lista. Si no se asigan un valor, no se podrá agregar más elementos a las opciones.
 * @param {React.JSX.Element} [props.iconRemove] - Icono personalizado para deseleccionar opciones. (opcional)
 */
const MultipleSelect = ({
   options,  
   onChange, 
   label, 
   // selectedOptions=[],
   className="w-full text-base text-baseColor", 
   selectedOptionsClass="bg-accent100 text-slate-900 px-3 py-2 gap-1 rounded-3xl", 
   optionsClass="flex items-center px-3 py-2 rounded-3xl hover:bg-gray-100 cursor-pointer", 
   labelAddNew="Add",
   iconRemove = <XCircle
      stroke="#2F27CE"
      width={16}
      height={16} 
   />,
   placeholder=""
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
            value: `${inputValue.trim().toLowerCase().replace(" ", "-")}`,
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
         {label && <label>{label}</label>}
         <div 
            className="flex flex-wrap gap-3 mt-3 p-3 border border-gray-300 rounded-3xl bg-white cursor-pointer"
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
                     {iconRemove}
                  </button>
               </span>
            ))}
            <input
               type="text"
               value={inputValue}
               onChange={handleInputChange}
               onClick={toggleList}
               className="outline-none"
               placeholder={placeholder}
            />
         </div>
         {isOpen && (
            <ul className="w-full z-10 mt-1 py-3 bg-white border border-gray-300 rounded-3xl shadow-lg max-h-60 overflow-auto">
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
                     <PlusCircle className="mr-2 h-4 w-4 text-accent" />
                     {labelAddNew} {`"${inputValue}"`}
                  </li>
               )}
            </ul>
         )}
      </div>
   );
};

export default MultipleSelect;