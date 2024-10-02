import Image from "next/image";
import { useEffect, useState } from "react";

export default function Input({ 
  iconPosition = "none", 
  type = "text", 
  icon, 
  placeholder = "Enter text", 
  onChange, 
  disabled,
  allowOnlyNumbers = false, // Solo ingresar numeros
  ...props
 }) {
  const [inputValue, setInputValue] = useState(props.value || '') // Para tomar los valores del  input
  const [error, setError] = useState('') // Registrar si usa letras y mandar mensaje

  useEffect(() => {
    setInputValue(props.value || '')
  }, [props.value])

  const handleInputChange = (e) => { //Tomar los numeros recibidos
    const newValue = e.target.value
  
    if (allowOnlyNumbers) {
      const numericValue = newValue.replace(/[^0-9]/g, '') // Esta expresion sirve para remplazar o eliminar letras recibidas
      setInputValue(numericValue)
      setError(numericValue !== newValue ? 'Por favor, ingrese solo números' : '')
      onChange && onChange({ ...e, target: { ...e.target, value: numericValue } })
    } else {
      setInputValue(newValue)
      setError('')
      onChange && onChange(e)
    }
  }


  
  return (
    <div className="relative flex items-center flex-col">
      <input
        type={type}
        value={inputValue}
        placeholder={placeholder}
        className={`${props.className} w-full rounded-full py-2 px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-neutral-200
          ${iconPosition === 'left' ? 'pl-10' : ''} 
          ${iconPosition === 'right' ? 'pr-10' : ''}
        `}
        min={props.min}
        max={props.max}
        step={props.step}
        onChange={handleInputChange}
        disabled={disabled}
      />
  
      {iconPosition === 'left' && (
        <span className="absolute left-3 top-2.5">
          {typeof icon === 'string' ? <Image src={icon} height={24} width={24} alt="Input icon" /> : icon}
        </span>
      )}
  
      {iconPosition === 'right' && (
        <span className="absolute right-3 top-2.5">
          {typeof icon === 'string' ? <Image src={icon} height={24} width={24} alt="Input icon" /> : icon}
        </span>
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
