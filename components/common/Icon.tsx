import React from 'react';
import { ICONS } from '../../constants';

interface IconProps {
  name: string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, className = 'w-6 h-6' }) => {
  const svgContent = ICONS[name];
  if (!svgContent) {
    return null; // Or a default icon
  }
  
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor" 
      strokeWidth={1.5}
    >
      {svgContent}
    </svg>
  );
};

export default Icon;
