import React, { useState } from 'react';
import { RichEditor } from '../src';

const ExamplePage: React.FC = () => {
  const [content, setContent] = useState('<p>Hello World! Try editing this text...</p>');

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Rich Text Editor Example</h1>
      
      <div className=" overflow-hidden">
        <RichEditor
          content={content}
          onUpdate={(editor) => {
            setContent(editor.getHTML());
          }}
          editable={true}
        />  
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">Output:</h2>        
        <pre className=" p-4 rounded max-w-screen-md overflow-x-auto">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </pre>
      </div>
    </div>
  );
};

export default ExamplePage; 