import React from 'react';
import { Editor } from '@tiptap/core';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Code,
  Quote as QuoteIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Heading1Icon,
  Heading2Icon,
  Undo2,
  Redo2,
  Terminal,
  CheckSquare,
  Highlighter,
  Table as TableIcon,
  TableProperties,
  RowsIcon,
  ColumnsIcon,
  Trash2,
  Heading3Icon,
  Heading4Icon,
  Heading5Icon,
} from 'lucide-react';
import ToolbarButton from './ToolbarButton';
import LinkPopover from './LinkPopover';
import ImagePopover from './ImagePopover';
import ColorPicker from './ColorPicker';
import Dropdown from '../common/dropdown';
import { supportedLanguages } from '../code-highlight/languages';

interface ToolbarProps {
  editor: Editor;
  className?: string;
}

const Toolbar: React.FC<ToolbarProps> = ({ editor, className }) => {
  const insertTable = () => {
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  };

  const addColumnBefore = () => {
    editor.chain().focus().addColumnBefore().run();
  };

  const addColumnAfter = () => {
    editor.chain().focus().addColumnAfter().run();
  };

  const deleteColumn = () => {
    editor.chain().focus().deleteColumn().run();
  };

  const addRowBefore = () => {
    editor.chain().focus().addRowBefore().run();
  };

  const addRowAfter = () => {
    editor.chain().focus().addRowAfter().run();
  };

  const deleteRow = () => {
    editor.chain().focus().deleteRow().run();
  };

  const deleteTable = () => {
    editor.chain().focus().deleteTable().run();
  };

  const toggleHeaderRow = () => {
    editor.chain().focus().toggleHeaderRow().run();
  };

  const isTableSelected = editor?.isActive('table');

  return (
    <div
      className={`rich-editor-toolbar border-b rounded-t-lg border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white sticky top-0 z-10 ${className}`}
    >
      <div className="flex flex-wrap gap-0.5 p-2">
        <div className="flex items-center space-x-1 border-r border-gray-300 pr-2 mr-2">
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="Undo"
          >
            <Undo2 size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="Redo"
          >
            <Redo2 size={18} />
          </ToolbarButton>
        </div>

        <div className="flex items-center space-x-1 border-r border-gray-300 pr-2 mr-2">
          <Dropdown
            title='Heading'
            className="w-fit border-gray-300 dark:border-gray-700"
            active={
              editor.isActive('heading', { level: 1 }) ||
              editor.isActive('heading', { level: 2 }) ||
              editor.isActive('heading', { level: 3 }) ||
              editor.isActive('heading', { level: 4 }) ||
              editor.isActive('heading', { level: 5 }) ||
              false
            }
            label={
              editor.isActive('heading', { level: 1 }) ? (
                <Heading1Icon size={18} />
              ) : editor.isActive('heading', { level: 2 }) ? (
                <Heading2Icon size={18} />
              ) : editor.isActive('heading', { level: 3 }) ? (
                <Heading3Icon size={18} />
              ) : editor.isActive('heading', { level: 4 }) ? (
                <Heading4Icon size={18} />
              ) : editor.isActive('heading', { level: 5 }) ? (
                <Heading5Icon size={18} />
              ) : (
                'Heading'
              )
            }
          >
            <div
              className={`p-2 hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer bg-gray-200 dark:bg-gray-700 ${
                editor.isActive('heading', { level: 1 })
                  ? 'text-blue-600 dark:text-blue-400'
                  : ''
              }`}
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              title="Heading 1"
            >
              <Heading1Icon size={18} />
            </div>
            <div
              className={`p-2 hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer bg-gray-200 dark:bg-gray-700 ${
                editor.isActive('heading', { level: 2 })
                  ? 'text-blue-600 dark:text-blue-400'
                  : ''
              }`}
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              title="Heading 2"
            >
              <Heading2Icon size={18} />
            </div>
            <div
              className={`p-2 hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer bg-gray-200 dark:bg-gray-700 ${
                editor.isActive('heading', { level: 3 })
                  ? 'text-blue-600 dark:text-blue-400'
                  : ''
              }`}
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              title="Heading 3"
            >
              <Heading3Icon size={18} />
            </div>
            <div
              className={`p-2 hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer bg-gray-200 dark:bg-gray-700 ${
                editor.isActive('heading', { level: 4 })
                  ? 'text-blue-600 dark:text-blue-400'
                  : ''
              }`}
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 4 }).run()
              }
              title="Heading 4"
            >
              <Heading4Icon size={18} />
            </div>
            <div
              className={`p-2 hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer bg-gray-200 dark:bg-gray-700 ${
                editor.isActive('heading', { level: 5 })
                  ? 'text-blue-600 dark:text-blue-400'
                  : ''
              }`}
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 5 }).run()
              }
              title="Heading 5"
            >
              <Heading5Icon size={18} />
            </div>
          </Dropdown>
        </div>

        <div className="flex items-center space-x-1 border-r border-gray-300 pr-2 mr-2">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive('bold')}
            title="Bold (Ctrl+B)"
          >
            <Bold size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive('italic')}
            title="Italic (Ctrl+I)"
          >
            <Italic size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            active={editor.isActive('underline')}
            title="Underline (Ctrl+U)"
          >
            <Underline size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            active={editor.isActive('strike')}
            title="Strikethrough"
          >
            <Strikethrough size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            active={editor.isActive('highlight')}
            title="Highlight"
          >
            <Highlighter size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleSuperscript().run()}
            active={editor.isActive('superscript')}
            title="Superscript"
          >
            <svg
              width={18}
              height={18}
              viewBox="0 0 1024 1024"
              fill="currentColor"
            >
              <path d="M768 206.016v50.016h128v64h-192V174.016l128-60V64h-128V0h192v146.016zM676 256h-136L352 444 164 256H28l256 256-256 256h136L352 580 540 768h136l-256-256z" />
            </svg>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleSubscript().run()}
            active={editor.isActive('subscript')}
            title="Subscript"
          >
            <svg
              width={18}
              height={18}
              fill="currentColor"
              viewBox="0 0 1024 1024"
            >
              <path d="M768 910.016v50.016h128v64h-192v-146.016l128-60V768h-128v-64h192v146.016zM676 256h-136L352 444 164 256H28l256 256-256 256h136L352 580 540 768h136l-256-256z"></path>
            </svg>
          </ToolbarButton>
        </div>

        <div className="flex items-center space-x-1 border-r border-gray-300 pr-2 mr-2">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive('bulletList')}
            title="Bullet List"
          >
            <List size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive('orderedList')}
            title="Numbered List"
          >
            <ListOrdered size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            active={editor.isActive('taskList')}
            title="Task List"
          >
            <CheckSquare size={18} />
          </ToolbarButton>
        </div>

        <div className="flex items-center space-x-1 border-r border-gray-300 pr-2 mr-2">
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            active={editor.isActive({ textAlign: 'left' })}
            title="Align Left"
          >
            <AlignLeft size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            active={editor.isActive({ textAlign: 'center' })}
            title="Align Center"
          >
            <AlignCenter size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            active={editor.isActive({ textAlign: 'right' })}
            title="Align Right"
          >
            <AlignRight size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            active={editor.isActive({ textAlign: 'justify' })}
            title="Justify"
          >
            <AlignJustify size={18} />
          </ToolbarButton>
        </div>

        <div className="flex items-center space-x-1 border-r border-gray-300 pr-2 mr-2">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            active={editor.isActive('code')}
            title="Code"
          >
            <Code size={18} />
          </ToolbarButton>
          <Dropdown
            title='Code Block'
            className="w-fit border-gray-300 dark:border-gray-700"
            active={editor.isActive('codeBlock')}
            label={
              supportedLanguages.find((language) =>
                editor.isActive('codeBlock', { language: language.value })
              )?.name || <Terminal size={18} />
            }
          >
            {supportedLanguages.map((language) => (
              <div key={language.value}
                className={`p-2 hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer bg-gray-200 dark:bg-gray-700 ${
                  editor.isActive('codeBlock', { language: language.value })
                    ? 'text-blue-600 dark:text-blue-400'
                    : ''
                }`}
                onClick={() =>
                  editor
                    .chain()
                    .focus()
                    .toggleCodeBlock({ language: language.value })
                    .run()
                }
                title={language.name}
              >
                {language.name}
              </div>
            ))}
          </Dropdown>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive('blockquote')}
            title="Quote"
          >
            <QuoteIcon size={18} />
          </ToolbarButton>
        </div>

        <ColorPicker editor={editor} />

        <LinkPopover editor={editor} />
        <ImagePopover editor={editor} />

        <div className="flex items-center space-x-1 border-r border-gray-300 pr-2 mr-2">
          <ToolbarButton
            onClick={insertTable}
            title="Insert Table"
            active={isTableSelected}
          >
            <TableIcon size={18} />
          </ToolbarButton>

          {isTableSelected && (
            <>
              <ToolbarButton
                onClick={toggleHeaderRow}
                title="Toggle Header Row"
              >
                <TableProperties size={18} />
              </ToolbarButton>
              <div className="flex items-center space-x-1">
                <ToolbarButton
                  onClick={addColumnBefore}
                  title="Add Column Before"
                >
                  <ColumnsIcon size={18} className="rotate-180" />
                </ToolbarButton>
                <ToolbarButton
                  onClick={addColumnAfter}
                  title="Add Column After"
                >
                  <ColumnsIcon size={18} />
                </ToolbarButton>
                <ToolbarButton onClick={deleteColumn} title="Delete Column">
                  <Trash2 size={18} />
                </ToolbarButton>
              </div>
              <div className="flex items-center space-x-1">
                <ToolbarButton onClick={addRowBefore} title="Add Row Before">
                  <RowsIcon size={18} className="rotate-180" />
                </ToolbarButton>
                <ToolbarButton onClick={addRowAfter} title="Add Row After">
                  <RowsIcon size={18} />
                </ToolbarButton>
                <ToolbarButton onClick={deleteRow} title="Delete Row">
                  <Trash2 size={18} />
                </ToolbarButton>
              </div>
              <ToolbarButton onClick={deleteTable} title="Delete Table">
                <Trash2 size={18} />
              </ToolbarButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
