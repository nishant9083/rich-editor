import React, { useState } from 'react';
import { Editor } from '@tiptap/core';
import { Link } from 'lucide-react';
import Popover from '../common/Popover';
import ToolbarButton from './ToolbarButton';

interface LinkPopoverProps {
  editor: Editor;
}

const LinkPopover: React.FC<LinkPopoverProps> = ({ editor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [text, setText] = useState('');

  const handleInsertLink = () => {
    if (!url) return;

    if (editor.state.selection.empty) {
      // No text selected, insert new link with provided text
      editor
        .chain()
        .focus()
        .insertContent({
          type: 'text',
          text: text || url,
          marks: [
            {
              type: 'link',
              attrs: { href: url },
            },
          ],
        })
        .run();
    } else {
      // Text selected, convert to link
      editor.chain().focus().setLink({ href: url }).run();
    }

    setUrl('');
    setText('');
    setIsOpen(false);
  };

  return (
    <Popover
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      trigger={
        <ToolbarButton
          onClick={() => setIsOpen(true)}
          active={editor.isActive('link')}
          title="Insert Link"
        >
          <Link size={18} />
        </ToolbarButton>
      }
    >
      <div className="p-4 min-w-[300px] dark:bg-gray-800 rounded-lg">
        <div className="space-y-4">
          {editor.state.selection.empty && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Link Text
              </label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                placeholder="Enter link text"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              URL
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              placeholder="https://example.com"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setIsOpen(false)}
              className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleInsertLink}
              className="px-3 py-1.5 text-sm text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded"
            >
              Insert
            </button>
          </div>
        </div>
      </div>
    </Popover>
  );
};

export default LinkPopover; 