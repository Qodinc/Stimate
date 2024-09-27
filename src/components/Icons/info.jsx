const Info = ({ fill = "none", stroke = "#2F27CE", width = 24, height = 24 }) => (
    <svg width={width} height={height} viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke={stroke} strokeWidth="2" fill={fill} />
      <line x1="12" y1="16" x2="12" y2="11" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="8" r="1" fill={stroke} />
    </svg>
  );
  
  export default Info;