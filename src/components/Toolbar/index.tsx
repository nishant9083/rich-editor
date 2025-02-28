import React from "react";
import { Editor } from "@tiptap/core";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Link,
  ImageIcon,
  Code,
  Quote as QuoteIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Heading1Icon,
  Heading2Icon,
  X,
  Undo2,
  Redo2,
  Terminal,
  CheckSquare,
  Highlighter,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import ToolbarButton from "./ToolbarButton";
import LinkPopover from "./LinkPopover";
import ImagePopover from "./ImagePopover";
import ColorPicker from "./ColorPicker";

interface ToolbarProps {
  editor: Editor;
  theme: "light" | "dark";
}

const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
  const addImage = () => {
    const url = window.prompt("Enter image URL:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = () => {
    const url = window.prompt("Enter URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white sticky top-0 z-10">
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
          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            active={editor.isActive("heading", { level: 1 })}
            title="Heading 1"
          >
            <Heading1Icon size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            active={editor.isActive("heading", { level: 2 })}
            title="Heading 2"
          >
            <Heading2Icon size={18} />
          </ToolbarButton>
        </div>

        <div className="flex items-center space-x-1 border-r border-gray-300 pr-2 mr-2">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive("bold")}
            title="Bold (Ctrl+B)"
          >
            <Bold size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive("italic")}
            title="Italic (Ctrl+I)"
          >
            <Italic size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            active={editor.isActive("underline")}
            title="Underline (Ctrl+U)"
          >
            <Underline size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            active={editor.isActive("strike")}
            title="Strikethrough"
          >
            <Strikethrough size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            active={editor.isActive("highlight")}
            title="Highlight"
          >
            <Highlighter size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleSuperscript().run()}
            active={editor.isActive("superscript")}
            title="Superscript"
          >
            <svg width={18} height={18} viewBox="0 0 1024 1024" fill="currentColor">
              <path d="M768 206.016v50.016h128v64h-192V174.016l128-60V64h-128V0h192v146.016zM676 256h-136L352 444 164 256H28l256 256-256 256h136L352 580 540 768h136l-256-256z" />
            </svg>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleSubscript().run()}
            active={editor.isActive("subscript")}
            title="Subscript"
          >
            <svg width={18} height={18} fill="currentColor" viewBox="0 0 1024 1024">
              <path d="M768 910.016v50.016h128v64h-192v-146.016l128-60V768h-128v-64h192v146.016zM676 256h-136L352 444 164 256H28l256 256-256 256h136L352 580 540 768h136l-256-256z"></path>
            </svg>
          </ToolbarButton>
        </div>

        <div className="flex items-center space-x-1 border-r border-gray-300 pr-2 mr-2">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive("bulletList")}
            title="Bullet List"
          >
            <List size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive("orderedList")}
            title="Numbered List"
          >
            <ListOrdered size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            active={editor.isActive("taskList")}
            title="Task List"
          >
            <CheckSquare size={18} />
          </ToolbarButton>
        </div>

        <div className="flex items-center space-x-1 border-r border-gray-300 pr-2 mr-2">
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            active={editor.isActive({ textAlign: "left" })}
            title="Align Left"
          >
            <AlignLeft size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            active={editor.isActive({ textAlign: "center" })}
            title="Align Center"
          >
            <AlignCenter size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            active={editor.isActive({ textAlign: "right" })}
            title="Align Right"
          >
            <AlignRight size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            active={editor.isActive({ textAlign: "justify" })}
            title="Justify"
          >
            <AlignJustify size={18} />
          </ToolbarButton>
        </div>

        <div className="flex items-center space-x-1 border-r border-gray-300 pr-2 mr-2">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            active={editor.isActive("code")}
            title="Code"
          >
            <Code size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            active={editor.isActive("codeBlock")}
            title="Code Block"
          >
            <Terminal size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive("blockquote")}
            title="Quote"
          >
            <QuoteIcon size={18} />
          </ToolbarButton>
        </div>

        <ColorPicker editor={editor} />

        <LinkPopover editor={editor} />
        <ImagePopover editor={editor} />
      </div>
    </div>
  );
};

export default Toolbar;
