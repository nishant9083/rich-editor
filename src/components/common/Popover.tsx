import React, { useEffect, useRef, useState } from 'react';

interface PopoverProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  trigger: React.ReactNode;
}

const Popover: React.FC<PopoverProps> = ({ isOpen, onClose, children, trigger }) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 5,
        left: rect.left + window.scrollX,
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div className="relative">
      <div ref={triggerRef}>{trigger}</div>
      {isOpen && (
        <div
          ref={popoverRef}
          className="fixed z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 dark:text-white"
          style={{ top: position.top, left: position.left }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Popover; 