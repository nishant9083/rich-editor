import React from 'react';
import { ToolbarButtonProps } from '../../types';

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  active = false,
  disabled = false,
  onClick,
  children,
  title,
}) => {
  return (
    <button
      type="button"
      className={`
        p-2 rounded 
        hover:bg-gray-100 dark:hover:bg-gray-700 
        hover:text-gray-900 dark:hover:text-gray-100
        ${active ? 'bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-200'} 
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      {children}
    </button>
  );
};

export default ToolbarButton; 