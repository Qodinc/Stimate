

const TextArea = ({ label, id, placeholder, onChange, required }) => {
  return (
    <div className="w-full max-w-lg ">
        <div className="flex flex-col space-y-2">
            <label htmlFor={id} className="text-base text-left text-[#0A0A0B]">
                {label}
            </label>
        </div>
      <textarea
        id={id}
        className="w-full h-24 px-3 py-2 text-[#0A0A0B] bg-baseTextarea text-base border-2 rounded-[28px] border-[#E0DFF9] focus:outline-none focus:border-[#2F27CE] resize-none placeholder-[#5A5555]"
        placeholder={placeholder}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default TextArea;