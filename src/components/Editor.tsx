import React, { useEffect } from 'react';
import { useEditor, EditorContent, isNodeActive } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Highlight from '@tiptap/extension-highlight';
import { CustomImage } from '../extensions/CustomImage';
import { EditorProps } from '../types';
import Toolbar from './Toolbar/index';
import '../styles/editor.css';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import { lowlight } from './code-highlight/languages';
import { codeTheme } from './code-highlight/theme';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';
import { Node } from '@tiptap/pm/model';

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
  toolbarClassName
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        code: {
          HTMLAttributes: {
            class:
              'dark:bg-[#1e242a] dark:text-white bg-[#f0f1f2] text-black rounded-md p-1',
          },
        },
        blockquote: {
          HTMLAttributes: {
            class:
              'border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-4 dark:text-[#4b5563]',
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
        heading: {
          HTMLAttributes: {
            class: '',            
          },
          levels: [1, 2, 3, 4, 5, 6],        
        },
      }),
      Highlight.configure({
        HTMLAttributes: {
          class: 'p-1 rounded-md',
        },
        multicolor: true,        
      }),
      Link.configure({
        openOnClick: 'whenNotEditable',
        HTMLAttributes: {
          class: 'text-blue-500 cursor-pointer',
        },
      }),
      CodeBlockLowlight.extend({
        addKeyboardShortcuts() {
          return {
            ...this.parent?.(),
            Tab: ({ editor }) => {
              const { state, view } = editor;
              if (isNodeActive(editor.state, this.type)) {
                view.dispatch(state.tr.insertText('\t'));
                return true;
              }
              return false;
            },
          };
        },
        addProseMirrorPlugins() {
          const plugins = this.parent?.() || [];
          return [
            ...plugins,
            new Plugin({
              key: new PluginKey('codeblock-styling'),
              props: {
                decorations: (state: any) => {
                  const { doc } = state;
                  const decorations: Decoration[] = [];

                  doc.descendants((node: Node, pos: number) => {
                    if (node.type.name === 'codeBlock') {
                      const dom = document.createElement('div');
                      Object.entries(codeTheme).forEach(([selector, styles]) => {
                        const style = document.createElement('style');
                        style.textContent = `${selector} { ${Object.entries(styles)
                          .map(([prop, value]) => `${prop}: ${value};`)
                          .join(' ')} }`;
                        dom.appendChild(style);
                      });
                      
                      decorations.push(
                        Decoration.widget(pos, dom)
                      );
                    }
                  });

                  return DecorationSet.create(doc, decorations);
                },
              },
            }),
          ];
        },
      }).configure({
        lowlight,
        exitOnTripleEnter: true,
        defaultLanguage: 'javascript',
        HTMLAttributes: {
          class: 'dark:bg-[#1e242a] dark:text-white bg-[#f0f1f2] text-black rounded-md p-1 prose-pre:p-0 overflow-x-auto scrollbar-hide',
          spellcheck: 'false',
        },
      }),
      CustomImage.configure({
        HTMLAttributes: {
          class: '',
          draggable: false,          
        },
        allowBase64: true,        
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right'],
        defaultAlignment: 'left',
      }),
      TextStyle,
      Color.configure({
        types: [
          'textStyle',
          'heading',
          'code',
          'blockquote',
          'listItem',
          'bulletList',
          'orderedList',
          'codeBlock',
        ],
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
      Table.configure({
        resizable: true,
        cellMinWidth: 100,
        lastColumnResizable: false,
        HTMLAttributes: {
          class: 'border-collapse table-auto w-fit-content',
        },
      }),
      TableRow.configure({
        HTMLAttributes: {
          class: 'border-b dark:border-gray-600',
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class:
            'border-b dark:border-gray-600 dark:text-white bg-gray-100 dark:bg-gray-700 font-medium',
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: 'border border-gray-200 dark:border-gray-600 p-2',
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
        class: 'focus:outline-none min-h-[300px] ',
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
          class:
            'focus:outline-none min-h-[300px]',
        },
      },
    });
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div
      className={'rich-editor dark:bg-[#292a2c] dark:text-white dark:border-gray-600 border rounded-lg'}
    >
      {showToolbar && <Toolbar className={toolbarClassName} editor={editor} />}
      <EditorContent
        placeholder={placeholder}
        editor={editor}
        className={`rich-editor-content px-8 max-w-none p-4 focus:outline-none ${className} rounded-lg overflow-y-auto rich-editor-scrollbar`}
        onFocus={() => {
          
        }}
      />
    </div>
  );
};

export default RichEditor;
