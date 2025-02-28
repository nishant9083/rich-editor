import React from 'react';
import { NodeViewWrapper, NodeViewProps } from '@tiptap/react';
import ImageResizer from '../components/ImageResizer';

const ImageNodeView: React.FC<NodeViewProps> = ({ node, editor, selected }) => {
  return (
    <NodeViewWrapper>
      {selected ? (
        <ImageResizer
          editor={editor}
          imageElement={document.querySelector(`img[src="${node.attrs.src}"]`) as HTMLImageElement}
        />
      ) : (
        <img
          src={node.attrs.src}
          alt={node.attrs.alt || ''}
          title={node.attrs.title}
          style={{
            width: node.attrs.width || 'auto',
            height: node.attrs.height || 'auto',
            display: node.attrs.display || 'inline',
            float: node.attrs.float || 'none',
            margin: node.attrs.margin || '0',
          }}
        />
      )}
    </NodeViewWrapper>
  );
};

export default ImageNodeView; 