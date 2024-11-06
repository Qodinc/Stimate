import React, { useState } from 'react';

const TextArea = ({ label, id, placeholder, onChange, required, defaultValue, name }) => {
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (required && newValue.trim() === '') {
      setError('Este campo es obligatorio');
    } else {
      setError('');
    }
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleBlur = (e) => {
    if (required && !e.target.value.trim()) {
      setError('*Este campo es obligatorio');
    }
  };

  return (
    <div className="w-full max-w-lg">
      <div className="flex flex-col space-y-2">
        <label htmlFor={id} className="text-base text-left text-[#0A0A0B]">
          {label}
        </label>
      </div>
      <textarea
        id={id}
        name={name}
        className={`w-full h-24 px-3 py-2 text-[#0A0A0B] bg-baseTextarea text-base border-2 rounded-[28px] ${
          error ? 'border-red-500' : 'border-[#E0DFF9]'
        } focus:outline-none focus:border-[#2F27CE] resize-none placeholder-[#5A5555]`}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        required={required}
        value={defaultValue}
      ></textarea>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default TextArea;