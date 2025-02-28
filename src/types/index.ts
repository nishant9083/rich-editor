import { Editor } from '@tiptap/core';
import React from 'react';

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
}

export interface ToolbarButtonProps {
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  title?: string;
} 