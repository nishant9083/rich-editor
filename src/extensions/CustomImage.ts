import Image from '@tiptap/extension-image';
import { isNodeActive, mergeAttributes } from '@tiptap/core';
import { NodeSelection, Plugin, PluginKey } from '@tiptap/pm/state';


export const CustomImage = Image.extend({
  addAttributes() {
    const attrs = this.parent?.() || {};
    
    return {
      ...attrs,
      textAlign: {
        default: 'left',
        parseHTML: element => element.getAttribute('data-text-align') || 'left',
        renderHTML: attributes => ({
          'data-text-align': attributes.textAlign,
        }),
      },
      width: {
        default: '400px',
        parseHTML: element => element.style.width || '400px',
        renderHTML: attributes => ({
          style: `width: ${attributes.width}`,
        }),
      },
      height: {
        default: '400px',
        parseHTML: element => element.style.height || '400px',
        renderHTML: attributes => ({
          style: `height: ${attributes.height}`,
        }),
      },
      display: {
        default: 'inline',
        parseHTML: element => element.style.display,
        renderHTML: attributes => ({
          style: `display: ${attributes.display}`,
        }),
      },
      alt: {
        default: 'Image',
        parseHTML: element => element.getAttribute('alt') || 'Image',
        renderHTML: attributes => ({
          alt: attributes.alt,
        }),
      },
      // float: {
      //   default: 'none',
      //   parseHTML: element => element.style.float,
      //   renderHTML: attributes => ({
      //     style: `float: ${attributes.float}`,
      //   }),
      // },
      // margin: {
      //   default: '0',
      //   parseHTML: element => element.style.margin,
      //   renderHTML: attributes => ({
      //     style: `margin: ${attributes.margin}`,
      //   }),
      // },
      naturalWidth: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-width'),
        renderHTML: (attrs) => ({ 'data-width': attrs.naturalWidth }),
      },
      naturalHeight: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-height'),
        renderHTML: (attrs) => ({ 'data-height': attrs.naturalHeight }),
      },
    };
  },

  addNodeView() {
    return ({ node, editor, getPos }) => {
      const img = document.createElement('img');
      const width = node.attrs.width || 'auto';
      const height = node.attrs.height || 'auto';

      img.src = node.attrs.src;
      img.style.width = width;
      img.style.height = height;
      img.style.objectFit = 'cover';
      img.draggable = true;      

      // Create resize handle container
      const wrapper = document.createElement('div');
      wrapper.style.position = 'relative';
      wrapper.style.display = 'inline-block'; 
      wrapper.style.textAlign = node.attrs.textAlign || 'left'; // Support alignment
      wrapper.style.margin = '0 auto'; // Center the div
      wrapper.draggable = false;
      wrapper.appendChild(img);

      // Resizable handle styles (positioned at each corner)
      const handleStyles = {
        position: 'absolute',
        width: '12px',
        height: '12px',        
        cursor: 'se-resize',
        display: 'none', // Hide by default
      };

      const createHandle = (position: string, cursor: string) => {
        const handle = document.createElement('div');
        handle.style.position = 'absolute';
        handle.style.width = handleStyles.width;
        handle.style.height = handleStyles.height;        
        handle.style.cursor = cursor;
        handle.style.display = handleStyles.display;
        handle.classList.add('resize-handle');

        // Set the position of the handle
        if (position === 'top-left') {
          handle.style.top = '0';
          handle.style.left = '0';
          handle.style.cursor = 'nw-resize';
        } else if (position === 'top-right') {
          handle.style.top = '0';
          handle.style.right = '0';
          handle.style.cursor = 'ne-resize';
        } else if (position === 'bottom-left') {
          handle.style.bottom = '0';
          handle.style.left = '0';
          handle.style.cursor = 'sw-resize';
        } else if (position === 'bottom-right') {
          handle.style.bottom = '0';
          handle.style.right = '0';
          handle.style.cursor = 'se-resize';
        }

        return handle;
      };

      // Create the four handles (top-left, top-right, bottom-left, bottom-right)
      const topLeftHandle = createHandle('top-left', 'nw-resize');
      const topRightHandle = createHandle('top-right', 'ne-resize');
      const bottomLeftHandle = createHandle('bottom-left', 'sw-resize');
      const bottomRightHandle = createHandle('bottom-right', 'se-resize');

      wrapper.appendChild(topLeftHandle);
      wrapper.appendChild(topRightHandle);
      wrapper.appendChild(bottomLeftHandle);
      wrapper.appendChild(bottomRightHandle);

      // Size constraints
      const MIN_WIDTH = 200; // pixels
      const MIN_HEIGHT = 200; // pixels
      const MAX_WIDTH = node.attrs.naturalWidth || 800; // pixels
      const MAX_HEIGHT = node.attrs.naturalHeight || 600; // pixels

      // Add resizing logic
      const resizeHandler = (handle: HTMLElement, corner: string) => {
        let isResizing = false;
        let startX: number, startY: number, startWidth: number, startHeight: number;

        handle.addEventListener('mousedown', (event: MouseEvent) => {
          event.preventDefault(); // Prevent drag effect during resize
          isResizing = true;
          startX = event.clientX;
          startY = event.clientY;
          startWidth = img.offsetWidth;
          startHeight = img.offsetHeight;

          const onMouseMove = (moveEvent: MouseEvent) => {
            if (isResizing) {
              moveEvent.preventDefault(); // Prevent drag effect during resize
              let deltaX = moveEvent.clientX - startX;
              let deltaY = moveEvent.clientY - startY;

              let newWidth: number;
              let newHeight: number;

              if (corner === 'top-left') {
                newWidth = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startWidth - deltaX));
                newHeight = Math.min(MAX_HEIGHT, Math.max(MIN_HEIGHT, startHeight - deltaY));
                img.style.width = `${newWidth}px`;
                img.style.height = `${newHeight}px`;
                if (newWidth >= MIN_WIDTH && newWidth <= MAX_WIDTH) img.style.left = `${startX + deltaX}px`;
                if (newHeight >= MIN_HEIGHT && newHeight <= MAX_HEIGHT) img.style.top = `${startY + deltaY}px`;
              } else if (corner === 'top-right') {
                newWidth = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startWidth + deltaX));
                newHeight = Math.min(MAX_HEIGHT, Math.max(MIN_HEIGHT, startHeight - deltaY));
                img.style.width = `${newWidth}px`;
                img.style.height = `${newHeight}px`;
                if (newHeight >= MIN_HEIGHT && newHeight <= MAX_HEIGHT) img.style.top = `${startY + deltaY}px`;
              } else if (corner === 'bottom-left') {
                newWidth = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startWidth - deltaX));
                newHeight = Math.min(MAX_HEIGHT, Math.max(MIN_HEIGHT, startHeight + deltaY));
                img.style.width = `${newWidth}px`;
                img.style.height = `${newHeight}px`;
                if (newWidth >= MIN_WIDTH && newWidth <= MAX_WIDTH) img.style.left = `${startX + deltaX}px`;
              } else if (corner === 'bottom-right') {
                newWidth = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startWidth + deltaX));
                newHeight = Math.min(MAX_HEIGHT, Math.max(MIN_HEIGHT, startHeight + deltaY));
                img.style.width = `${newWidth}px`;
                img.style.height = `${newHeight}px`;
              }

              // Update image attributes with the new size
              editor.commands.updateAttributes(node.type, {
                width: img.style.width,
                height: img.style.height,
              });
            }
          };

          const onMouseUp = () => {
            isResizing = false;
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
          };

          document.addEventListener('mousemove', onMouseMove);
          document.addEventListener('mouseup', onMouseUp);
        });
      };

      // Add event listeners for each resize handle
      resizeHandler(topLeftHandle, 'top-left');
      resizeHandler(topRightHandle, 'top-right');
      resizeHandler(bottomLeftHandle, 'bottom-left');
      resizeHandler(bottomRightHandle, 'bottom-right');      

      return {
        dom: wrapper,
      };
    };
  },

  
  addProseMirrorPlugins() {
    const plugins = this.parent?.() || [];
    return [
      ...plugins,
      new Plugin({
        key: new PluginKey('image-protection'),
        props: {
          handleKeyDown(view, event) {
            // Prevent deletion of the image on any key press except Delete or Backspace
            if (event.key !== 'Delete' && event.key !== 'Backspace') {
              const { state, dispatch } = view;
              const { selection } = state;
              const { $from } = selection;

              // Check if the selection is on an image node
              const node = $from.node($from.depth);
              if (node.type.name === 'doc') {
                event.preventDefault(); // Prevent the default action
                return true; // Indicate that the event has been handled
              }
            }
            return false; // Allow other key events to be processed normally
          },
        },
      }),
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ['img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
  },

  addCommands() {
    return {
      ...this.parent?.(),
      insertImage:
        ({ width, height, ...options }: { width: number, height: number, options: any }) =>
        ({ commands }: { commands: any }) => {
          return commands.setImage({
            ...options,
            naturalWidth: width,
            naturalHeight: height,
          } as any);
        },
    };
  },
}); 