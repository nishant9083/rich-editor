import React, { useEffect, useState, HTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';

interface DropdownProps extends HTMLAttributes<HTMLDivElement> {
  active: boolean;
  label?: string | React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({
  active,
  label,
  className,
  children,
  ...props // Spread other props
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest('.relative')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative" {...props}>
      <div
        className={`hover:bg-gray-100 dark:hover:bg-gray-700 
        hover:text-gray-900 dark:hover:text-gray-100 rounded-lg p-2 cursor-pointer flex items-center justify-between ${className}`}
        onClick={toggleDropdown}
      >
        <span className={`${active ? 'text-blue-600 dark:text-blue-400' : ''}`}>
          {label}
        </span>
        <ChevronDown size={16} />
      </div>
      {isOpen && (
        <div className="absolute max-h-[300px] min-w-fit overflow-y-auto z-50 mt-1 w-full bg-white dark:bg-gray-800 border shadow-lg rich-editor-scrollbar">
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
