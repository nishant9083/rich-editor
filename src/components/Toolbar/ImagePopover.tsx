import React, { useState, useRef } from 'react';
import { Editor } from '@tiptap/core';
import { ImageIcon, Link, Upload } from 'lucide-react';
import Popover from '../common/Popover';
import ToolbarButton from './ToolbarButton';

interface ImagePopoverProps {
  editor: Editor;
}

const ImagePopover: React.FC<ImagePopoverProps> = ({ editor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        const img = new Image();
        img.onload = () => {
          editor.chain().focus().setImage({
            src: e.target?.result as string,
            alt: img.alt || 'Image',
            title: '',
          }).run();
        };
        img.src = e.target.result as string;
        setIsOpen(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUrlSubmit = () => {
    if (url) {
      const img = new Image();
      img.onload = () => {
        editor.chain().focus().setImage({
          src: url,
          alt: 'Image',
          title: ''
        }).run();
      };
      img.src = url;
      setUrl('');
      setIsOpen(false);
    }
  };

  return (
    <Popover
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      trigger={
        <ToolbarButton onClick={() => setIsOpen(true)} title="Insert Image">
          <ImageIcon size={18} />
        </ToolbarButton>
      }
    >
      <div className="p-4 min-w-[300px] dark:bg-gray-800 rounded-lg">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Upload Image
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file);
              }}
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full px-4 py-2 border-2 border-dashed rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-center gap-2"
            >
              <Upload size={18} />
              Choose File
            </button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Image URL
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                placeholder="https://example.com/image.jpg"
              />
              <button
                onClick={handleUrlSubmit}
                className="px-3 py-2 text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-md"
              >
                <Link size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Popover>
  );
};

export default ImagePopover; 