const Timer = ({ fill = 'none', stroke = '#2F27CE', width, height }) => (
<svg width={width} height={height} viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
<path d="M10 2H14" stroke={stroke} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 14L15 11" stroke={stroke} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 22C16.4183 22 20 18.4183 20 14C20 9.58172 16.4183 6 12 6C7.58172 6 4 9.58172 4 14C4 18.4183 7.58172 22 12 22Z" stroke={stroke} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

);

export default Timer