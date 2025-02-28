import Image from '@tiptap/extension-image';
import { mergeAttributes } from '@tiptap/core';

export const CustomImage = Image.extend({
  addAttributes() {
    const attrs = this.parent?.() || {};
    
    return {
      ...attrs,
      width: {
        default: 'auto',
        parseHTML: element => element.style.width || 'auto',
        renderHTML: attributes => ({
          style: `width: ${attributes.width}`,
        }),
      },
      height: {
        default: 'auto',
        parseHTML: element => element.style.height || 'auto',
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
      float: {
        default: 'none',
        parseHTML: element => element.style.float,
        renderHTML: attributes => ({
          style: `float: ${attributes.float}`,
        }),
      },
      margin: {
        default: '0',
        parseHTML: element => element.style.margin,
        renderHTML: attributes => ({
          style: `margin: ${attributes.margin}`,
        }),
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return ['img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
  },
}); 