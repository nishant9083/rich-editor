import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import  RichEditor from '../src/components/Editor';
import { describe, expect, it, vi } from 'vitest';
import React from 'react';

describe('RichEditor', () => {
  it('renders with initial content', () => {
    render(<RichEditor content="Hello, world!" />);
    expect(screen.getByText('Hello, world!')).toBeDefined();
  });

  it('shows placeholder when empty', () => {
    render(<RichEditor placeholder="Start typing..." />);
    expect(screen.getByPlaceholderText('Start typing...')).toBeDefined();
  });

//   it('handles editable prop correctly', () => {
//     render(<RichEditor editable={false} content="Read only content" />);
//     const editor = screen.getByText('Read only content');
//     expect(editor.getAttribute('contenteditable')).toBe('false');
//   });

//   it('applies custom className', () => {
//     const customClass = 'custom-editor';
//     render(<RichEditor className={customClass} />);
//     expect(screen.getByRole('textbox')).toHaveProperty('class', expect.stringContaining(customClass));
//   });

//   it('shows toolbar when showToolbar is true', () => {
//     render(<RichEditor showToolbar={true} />);
//     const toolbar = screen.getByRole('toolbar');
//     expect(toolbar).toBeTruthy();
//   });

//   it('hides toolbar when showToolbar is false', () => {
//     render(<RichEditor showToolbar={false} />);
//     const toolbar = screen.queryByRole('toolbar');
//     expect(toolbar).toBeNull();
//   });

//   it('calls onUpdate callback when content changes', async () => {
//     const handleUpdate = vi.fn();
//     render(<RichEditor onUpdate={handleUpdate} />);
//     const editor = screen.getByRole('textbox');
//     await userEvent.type(editor, 'New content');
//     expect(handleUpdate).toHaveBeenCalled();
//   });

//   it('calls onBlur callback when editor loses focus', async () => {
//     const handleBlur = vi.fn();
//     render(<RichEditor onBlur={handleBlur} />);
//     const editor = screen.getByRole('textbox');
//     await userEvent.click(editor);
//     await userEvent.tab();
//     expect(handleBlur).toHaveBeenCalled();
//   });

//   it('calls onFocus callback when editor gains focus', async () => {
//     const handleFocus = vi.fn();
//     render(<RichEditor onFocus={handleFocus} />);
//     const editor = screen.getByRole('textbox');
//     await userEvent.click(editor);
//     expect(handleFocus).toHaveBeenCalled();
//   });
});