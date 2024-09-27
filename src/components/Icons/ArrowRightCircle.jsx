const ArrowRightCircle = ({ fill = 'none', stroke = 'black', width, height }) => (
   <svg width={width} height={height} viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke={stroke} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M12 16L16 12L12 8" stroke={stroke} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M8 12H16" stroke={stroke} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
   </svg>
);

export default ArrowRightCircle