import { Editor } from '@tiptap/core';

export type Theme = 'light' | 'dark' | 'system';

export interface EditorProps {
  content?: string;
  placeholder?: string;
  editable?: boolean;
  autofocus?: boolean;
  className?: string;
  onUpdate?: (editor: Editor) => void;
  onBlur?: (editor: Editor) => void;
  onFocus?: (editor: Editor) => void;
  showToolbar?: boolean;
  theme?: Theme;
}

export interface ToolbarButtonProps {
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  title?: string;
} 