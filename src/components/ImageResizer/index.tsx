import React, { useEffect, useRef, useState } from 'react';
import { Editor } from '@tiptap/core';
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

interface ImageResizerProps {
  editor: Editor;
  imageElement: HTMLImageElement;
}

const ImageResizer: React.FC<ImageResizerProps> = ({ editor, imageElement }) => {
  const [isResizing, setIsResizing] = useState(false);
  const [width, setWidth] = useState(imageElement.width);
  const [height, setHeight] = useState(imageElement.height);
  const [alignment, setAlignment] = useState<'left' | 'center' | 'right'>('center');
  const resizeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const style = window.getComputedStyle(imageElement);
    const float = style.getPropertyValue('float');

    if (float === 'left') setAlignment('left');
    else if (float === 'right') setAlignment('right');
    else setAlignment('center');

    setWidth(imageElement.width);
    setHeight(imageElement.height);
  }, [imageElement]);

  const updateImageAttributes = (attrs: Record<string, any>) => {
    const { src, alt, title } = imageElement;
    editor.chain().focus().setImage({ src, alt, title, ...attrs }).run();
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizing || !resizeRef.current) return;

    const rect = resizeRef.current.getBoundingClientRect();
    const newWidth = Math.max(100, event.pageX - rect.left);
    const ratio = imageElement.naturalHeight / imageElement.naturalWidth;
    const newHeight = Math.round(newWidth * ratio);

    setWidth(newWidth);
    setHeight(newHeight);

    updateImageAttributes({
      width: `${newWidth}px`,
      height: `${newHeight}px`,
    });
  };

  const startResizing = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', stopResizing);
  };

  const stopResizing = () => {
    setIsResizing(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', stopResizing);
  };

  const handleAlignment = (newAlignment: 'left' | 'center' | 'right') => {
    setAlignment(newAlignment);
    
    const attrs: Record<string, string> = {
      width: `${width}px`,
      height: `${height}px`,
    };

    if (newAlignment === 'center') {
      attrs.display = 'block';
      attrs.float = 'none';
      attrs.margin = '0 auto';
    } else {
      attrs.display = 'inline';
      attrs.float = newAlignment;
      attrs.margin = '0 1em 1em';
    }

    updateImageAttributes(attrs);
  };

  return (
    <div
      ref={resizeRef}
      className="group relative inline-block"
      style={{ width, height }}
    >
      <img
        src={imageElement.src}
        alt={imageElement.alt || ''}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
      <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity inset-0">
        <div className="absolute top-2 left-2 flex gap-1">
          <button
            onClick={() => handleAlignment('left')}
            className={`p-1.5 rounded ${
              alignment === 'left' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
            }`}
            title="Align left"
          >
            <AlignLeft size={16} />
          </button>
          <button
            onClick={() => handleAlignment('center')}
            className={`p-1.5 rounded ${
              alignment === 'center' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
            }`}
            title="Align center"
          >
            <AlignCenter size={16} />
          </button>
          <button
            onClick={() => handleAlignment('right')}
            className={`p-1.5 rounded ${
              alignment === 'right' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
            }`}
            title="Align right"
          >
            <AlignRight size={16} />
          </button>
        </div>
        <div
          className="absolute bottom-2 right-2 w-4 h-4 bg-white border border-gray-300 cursor-se-resize"
          onMouseDown={startResizing}
        />
      </div>
    </div>
  );
};

export default ImageResizer; 