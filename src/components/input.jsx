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
  error,
  ...props
}) {
  const [inputValue, setInputValue] = useState(props.value || '') // Para tomar los valores del  input
  useEffect(() => {
    setInputValue(props.value || '')
  }, [props.value])

  const handleInputChange = (e) => { //Tomar los numeros recibidos
    const newValue = e.target.value

    if (allowOnlyNumbers) {
      const numericValue = newValue.replace(/[^0-9]/g, '') // Esta expresion sirve para remplazar o eliminar letras recibidas
      setInputValue(numericValue)
      error = (numericValue !== newValue ? 'Por favor, ingrese solo números' : '')
      onChange && onChange({ ...e, target: { ...e.target, value: numericValue } })
    } else {
      setInputValue(newValue)
      error = ('')
      onChange && onChange(e)
    }
  }



  return (
    <>
      <div className="relative flex items-center flex-col">
        <input
          type={type}
          value={inputValue}
          placeholder={placeholder}
          className={`${props.className} w-full rounded-full py-2 px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-neutral-200
          ${iconPosition === 'left' ? 'pl-10' : ''} 
          ${iconPosition === 'right' ? 'pr-10' : ''}
        `}
          name={props.name}
          min={props.min}
          max={props.max}
          maxLength={props.maxLength}
          step={props.step}
          onChange={handleInputChange}
          disabled={disabled}
          id={props.id}
          required={props.required}
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
      </div>
      {error && <span className="text-red-500 text-sm m-1">{error}</span>}
    </>
  );
}
