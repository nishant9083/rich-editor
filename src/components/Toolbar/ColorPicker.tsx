import React from 'react';
import { Editor } from '@tiptap/react';
import { RiText } from 'react-icons/ri';
import ToolbarButton from './ToolbarButton';

const colors = [
  // Grayscale row
  { color: '#000000', name: 'Black' },
  { color: '#262626', name: 'Dark Gray' },
  { color: '#434343', name: 'Gray' },
  { color: '#595959', name: 'Medium Gray' },
  { color: '#8C8C8C', name: 'Light Gray' },
  { color: '#BFBFBF', name: 'Lighter Gray' },
  { color: '#D9D9D9', name: 'Very Light Gray' },
  { color: '#E8E8E8', name: 'Almost White' },
  { color: '#F5F5F5', name: 'Off White' },
  { color: '#FFFFFF', name: 'White' },

  // Bright colors row 1
  { color: '#FF0000', name: 'Red' },
  { color: '#FF4D00', name: 'Orange Red' },
  { color: '#FF9900', name: 'Orange' },
  { color: '#FFE500', name: 'Yellow' },
  { color: '#51FF00', name: 'Lime' },
  { color: '#00FFCC', name: 'Turquoise' },
  { color: '#0099FF', name: 'Sky Blue' },
  { color: '#0033FF', name: 'Blue' },
  { color: '#9900FF', name: 'Purple' },
  { color: '#FF00CC', name: 'Pink' },

  // Light colors row 1
  { color: '#FFE5E5', name: 'Light Red' },
  { color: '#FFF0E5', name: 'Light Orange Red' },
  { color: '#FFF9E5', name: 'Light Orange' },
  { color: '#FFFFE5', name: 'Light Yellow' },
  { color: '#F0FFE5', name: 'Light Lime' },
  { color: '#E5FFF9', name: 'Light Turquoise' },
  { color: '#E5F2FF', name: 'Light Sky Blue' },
  { color: '#E5E5FF', name: 'Light Blue' },
  { color: '#F9E5FF', name: 'Light Purple' },
  { color: '#FFE5F2', name: 'Light Pink' },

  // Light colors row 2
  { color: '#FFCCCC', name: 'Lighter Red' },
  { color: '#FFE0CC', name: 'Lighter Orange Red' },
  { color: '#FFF2CC', name: 'Lighter Orange' },
  { color: '#FFFFCC', name: 'Lighter Yellow' },
  { color: '#E0FFCC', name: 'Lighter Lime' },
  { color: '#CCF2FF', name: 'Lighter Turquoise' },
  { color: '#CCE0FF', name: 'Lighter Sky Blue' },
  { color: '#CCCCFF', name: 'Lighter Blue' },
  { color: '#F2CCFF', name: 'Lighter Purple' },
  { color: '#FFCCE6', name: 'Lighter Pink' },

  // Bright colors row 2
  { color: '#FF3333', name: 'Bright Red' },
  { color: '#FF8533', name: 'Bright Orange Red' },
  { color: '#FFB833', name: 'Bright Orange' },
  { color: '#FFFF33', name: 'Bright Yellow' },
  { color: '#85FF33', name: 'Bright Lime' },
  { color: '#33FFE5', name: 'Bright Turquoise' },
  { color: '#33B8FF', name: 'Bright Sky Blue' },
  { color: '#3333FF', name: 'Bright Blue' },
  { color: '#B833FF', name: 'Bright Purple' },
  { color: '#FF33B8', name: 'Bright Pink' },

  // Dark colors
  { color: '#990000', name: 'Dark Red' },
  { color: '#994D00', name: 'Dark Orange Red' },
  { color: '#996600', name: 'Dark Orange' },
  { color: '#999900', name: 'Dark Yellow' },
  { color: '#4D9900', name: 'Dark Lime' },
  { color: '#009973', name: 'Dark Turquoise' },
  { color: '#006699', name: 'Dark Sky Blue' },
  { color: '#000099', name: 'Dark Blue' },
  { color: '#660099', name: 'Dark Purple' },
  { color: '#990073', name: 'Dark Pink' },
];

interface ColorPickerProps {
  editor: Editor;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ editor }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const buttonRef = React.useRef<HTMLDivElement>(null);

  const setColor = (color: string) => {
    editor.chain().focus().setColor(color).run();
    setIsOpen(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={buttonRef}>
      <ToolbarButton
        onClick={() => setIsOpen(!isOpen)}
        active={isOpen}
        title="Text color"
      >
        <RiText className="w-4 h-4" />
        <div
          className="w-2 h-2 rounded-full absolute bottom-0.5 right-0.5"
          style={{
            backgroundColor:
              editor.getAttributes('textStyle').color || 'currentColor',
          }}
        />
      </ToolbarButton>

      {isOpen && (
        <div
          className="fixed z-[9999] bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 p-2 w-48"
          style={{
            top:
              buttonRef.current?.getBoundingClientRect().bottom ||
              0 + window.scrollY + 5,
            left:
              buttonRef.current?.getBoundingClientRect().left ||
              0 + window.scrollX,
          }}
        >
          <div className="grid grid-cols-4 gap-1 overflow-y-auto max-h-56">
            {colors.map((color) => (
              <button
                key={color.name}
                className="w-8 h-8 rounded-md border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
                onClick={() => setColor(color.color)}
                title={color.name}
              >
                <div
                  className="w-6 h-6 rounded"
                  style={{
                    backgroundColor:
                      color.color === 'inherit' ? 'transparent' : color.color,
                    border:
                      color.color === 'inherit'
                        ? '2px solid currentColor'
                        : 'none',
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
