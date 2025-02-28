import React, { useCallback, useEffect, useState } from 'react';
import { useEditor, EditorContent, NodeViewWrapper } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { CodeBlockLowlightOptions } from '@tiptap/extension-code-block-lowlight';
import Highlight from '@tiptap/extension-highlight';
import { createLowlight } from 'lowlight';
import { CustomImage } from '../extensions/CustomImage';
import { EditorProps, Theme } from '../types';
import Toolbar from './Toolbar/index';
import '../styles/editor.css';
import ImageResizer from './ImageResizer';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';


const RichEditor: React.FC<EditorProps> = ({
  content = '',
  placeholder = 'Start writing...',
  editable = true,
  autofocus = false,
  className = '',
  onUpdate,
  onBlur,
  onFocus,
  showToolbar = true,
  theme = 'system',
}) => {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const updateTheme = () => {
      if (theme === 'system') {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setCurrentTheme(isDark ? 'dark' : 'light');
      } else {
        setCurrentTheme(theme);
      }
    };

    updateTheme();

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = () => updateTheme();
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, [theme]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        code: {
          HTMLAttributes: {
            class: `${
              currentTheme === 'dark' 
                ? 'bg-muted text-white' 
                : 'bg-[#f0f1f2] text-black'
            } rounded-md`,
          },
        },
        blockquote: {
          HTMLAttributes: {
            class: 'border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-4',
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc list-outside ml-4',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal list-outside ml-4',
          },
        },
        listItem: {
          HTMLAttributes: {
            class: 'pl-1',
          },
        },        
      }),
      Highlight.configure({
        HTMLAttributes: {
          // class: 'bg-yellow-100 text-yellow-800',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 cursor-pointer',
        },
      }),
      CodeBlockLowlight.configure({
        lowlight: createLowlight(),
        exitOnTripleEnter: true,
        defaultLanguage: 'javascript',        
        HTMLAttributes: {
          class: `${
            currentTheme === 'dark' 
              ? 'bg-muted text-white' 
              : 'bg-[#f0f1f2] text-black'
          } rounded-md`,
        },
      }),
      CustomImage.configure({
        HTMLAttributes: {
          class: 'cursor-pointer max-w-full',
        },
        allowBase64: true,
        inline: true,               
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TextStyle,
      Color.configure({
        types: ['textStyle', 'heading', 'code', 'blockquote', 'listItem', 'bulletList', 'orderedList', 'codeBlock'],
      }),
      TaskList.configure({
        HTMLAttributes: {
          class: 'not-prose pl-2',
        },
      }),
      TaskItem.configure({
        nested: true,
        HTMLAttributes: {
          class: 'flex items-start my-1',
        },
      }),
      Superscript.configure({
        HTMLAttributes: {
          class: 'text-[0.8em] relative top-[-0.5em]',
        },
      }),
      Subscript.configure({
        HTMLAttributes: {
          class: 'text-[0.8em] relative bottom-[-0.5em]',
        },
      }),
    ],
    content,
    editable,
    autofocus,
    onUpdate: ({ editor }) => {
      onUpdate?.(editor);
    },
    onBlur: ({ editor }) => {
      onBlur?.(editor);
    },
    onFocus: ({ editor }) => {
      onFocus?.(editor);
    },
    editorProps: {
      handleDOMEvents: {
        click: (view, event) => {
          const element = event.target as HTMLElement;
          if (element.tagName === 'IMG') {
            return true; // Prevent default image selection
          }
          return false;
        },
      },
      attributes: {
        class: 'focus:outline-none min-h-[300px]',
      },
    },
    enableContentCheck: true,
    enablePasteRules: true,
    enableInputRules: true,
  });

  useEffect(() => {
    if (!editor) return;
    
    editor.setOptions({
      editorProps: {
        ...editor.options.editorProps,
        attributes: {
          class: `focus:outline-none min-h-[300px] ${
            currentTheme === 'dark' ? 'dark' : ''
          }`,
        },
      },
    });
  }, [editor, currentTheme]);

  if (!editor) {
    return null;
  }

  return (
    <div className={`rich-editor ${className} ${currentTheme === 'dark' ? 'dark' : ''}`}>
      {showToolbar && <Toolbar editor={editor} theme={currentTheme} />}
      <EditorContent 
        editor={editor} 
        className="prose max-w-none p-4 focus:outline-none"
      />
    </div>
  );
};

export default RichEditor; 