export default function Input({ iconPosition = "none", type = "text", icon, placeholder = "Enter text" }) {
  return (
    <div className="relative flex items-center">
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full rounded-full py-2 px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500
          ${iconPosition === 'left' ? 'pl-10' : ''} 
          ${iconPosition === 'right' ? 'pr-10' : ''}
          ${type === 'number' ? 'appearance-none' : ''}
        `}
        min={type === 'number' ? "0" : undefined}
        style={type === 'number' ? { 
          MozAppearance: 'textfield', 
          WebkitAppearance: 'none' 
        } : {}}
      />
  
      {iconPosition === 'left' && (
        <span className="absolute left-3">
          <img src={icon} alt="Input icon" className="h-5 w-5" />
        </span>
      )}
  
      {iconPosition === 'right' && (
        <span className="absolute right-3">
          <img src={icon} alt="Input icon" className="h-5 w-5" />
        </span>
      )}
    </div>
  );
}
