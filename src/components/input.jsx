import Image from "next/image";

export default function Input({ iconPosition = "none", type = "text", icon, placeholder = "Enter text", onChange, disabled, ...props }) {
  return (
    <div className="relative flex items-center">
      <input
        type={type}
        value={props.value}
        placeholder={placeholder}
        className={`${props.className} w-full rounded-full py-2 px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-neutral-200
          ${iconPosition === 'left' ? 'pl-10' : ''} 
          ${iconPosition === 'right' ? 'pr-10' : ''}
        `}
        onChange={onChange}
        disabled={disabled}
      />
  
      {iconPosition === 'left' && (
        <span className="absolute left-3">
          {typeof icon === 'string' ? <Image src={icon} height={24} width={24} alt="Input icon" /> : icon}
        </span>
      )}
  
      {iconPosition === 'right' && (
        <span className="absolute right-3">
          {typeof icon === 'string' ? <Image src={icon} height={24} width={24} alt="Input icon" /> : icon}
        </span>
      )}
    </div>
  );
}
