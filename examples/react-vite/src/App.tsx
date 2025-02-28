import { useState } from 'react'
import { RichEditor } from '@nishant_verma/rich-editor'
import "@nishant_verma/rich-editor/dist/styles.css"

const demoContent = `
<h1>Rich Text Editor Demo</h1><p>Welcome to the rich text editor demo! This document showcases all available features.</p><h2>Text Formatting</h2><p>Basic formatting includes: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, and <s>strikethrough</s>.</p><p>You can also use <sup class="text-[0.8em] relative top-[-0.5em]">superscript</sup> and <sub class="text-[0.8em] relative bottom-[-0.5em]">subscript</sub> text.</p><p>Text can be <span style="color: rgb(255, 0, 0)">colored</span> in various <span style="color: rgb(0, 255, 0)">different</span> <span style="color: rgb(0, 0, 255)">colors</span>.</p><h2>Text Alignment</h2><p style="text-align: left">This text is left-aligned (default)</p><p style="text-align: center">This text is center-aligned</p><p style="text-align: right">This text is right-aligned</p><p style="text-align: justify">This text is justified and contains enough words to demonstrate how justified text is spread evenly across the width of the container.</p><h2>Lists</h2><h3>Bullet List:</h3><ul class="list-disc list-outside ml-4"><li class="pl-1"><p>First item</p></li><li class="pl-1"><p>Second item</p><ul class="list-disc list-outside ml-4"><li class="pl-1"><p>Nested item 1</p></li><li class="pl-1"><p>Nested item 2</p></li></ul></li><li class="pl-1"><p>Third item</p></li></ul><h3>Numbered List:</h3><ol class="list-decimal list-outside ml-4"><li class="pl-1"><p>First step</p></li><li class="pl-1"><p>Second step</p><ol class="list-decimal list-outside ml-4"><li class="pl-1"><p>Sub-step A</p></li><li class="pl-1"><p>Sub-step B</p></li></ol></li><li class="pl-1"><p>Third step</p></li></ol><h3>Task List:</h3><ul class="not-prose pl-2" data-type="taskList"><li class="flex items-start my-1" data-checked="true" data-type="taskItem"><label><input type="checkbox" checked="checked"><span></span></label><div><p>Completed task</p></div></li><li class="flex items-start my-1" data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>Pending task</p></div></li><li class="flex items-start my-1" data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>Another task</p><ul class="not-prose pl-2" data-type="taskList"><li class="flex items-start my-1" data-checked="true" data-type="taskItem"><label><input type="checkbox" checked="checked"><span></span></label><div><p>Nested completed task</p></div></li><li class="flex items-start my-1" data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>Nested pending task</p></div></li></ul></div></li></ul><h2>Code Blocks</h2><p>Inline code: <code class="dark:bg-[#1e242a] dark:text-white bg-[#f0f1f2] text-black rounded-md p-1">const greeting = "Hello, World!";</code></p><pre class="dark:bg-[#1e242a] dark:text-white bg-[#f0f1f2] text-black rounded-md p-1"><code class="language-javascript">// JavaScript Example
function fibonacci(n) {
  if (n &lt;= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Generate first 5 Fibonacci numbers
for (let i = 0; i &lt; 5; i++) {
  console.log(fibonacci(i));
}</code></pre><h2>Blockquotes</h2><blockquote class="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-4 dark:text-[#4b5563]"><p>This is a blockquote. It can contain multiple paragraphs.</p><p>Second paragraph in blockquote.</p></blockquote><h2>Tables</h2><table class="border-collapse table-auto w-full" style="min-width: 75px"><colgroup><col style="min-width: 25px"><col style="min-width: 25px"><col style="min-width: 25px"></colgroup><tbody><tr class="border-b dark:border-gray-600"><th class="border-b dark:border-gray-600 bg-gray-100 dark:bg-gray-700 font-medium" colspan="1" rowspan="1"><p>Header 1</p></th><th class="border-b dark:border-gray-600 bg-gray-100 dark:bg-gray-700 font-medium" colspan="1" rowspan="1"><p>Header 2</p></th><th class="border-b dark:border-gray-600 bg-gray-100 dark:bg-gray-700 font-medium" colspan="1" rowspan="1"><p>Header 3</p></th></tr><tr class="border-b dark:border-gray-600"><td class="border border-gray-200 dark:border-gray-600 p-2" colspan="1" rowspan="1"><p>Row 1, Cell 1</p></td><td class="border border-gray-200 dark:border-gray-600 p-2" colspan="1" rowspan="1"><p>Row 1, Cell 2</p></td><td class="border border-gray-200 dark:border-gray-600 p-2" colspan="1" rowspan="1"><p>Row 1, Cell 3</p></td></tr><tr class="border-b dark:border-gray-600"><td class="border border-gray-200 dark:border-gray-600 p-2" colspan="1" rowspan="1"><p>Row 2, Cell 1</p></td><td class="border border-gray-200 dark:border-gray-600 p-2" colspan="1" rowspan="1"><p>Row 2, Cell 2</p></td><td class="border border-gray-200 dark:border-gray-600 p-2" colspan="1" rowspan="1"><p>Row 2, Cell 3</p></td></tr></tbody></table><h2>Links and Images</h2><p>This is a <a target="_blank" rel="noopener noreferrer nofollow" class="text-blue-500 cursor-pointer" href="https://example.com">link to an example website</a>.</p><p>Below is an example image:</p><p><img class="cursor-pointer max-w-full" src="https://picsum.photos/600/300" alt="Random example image" style="width: auto; height: auto; display: ; float: ; margin: "></p><h2>Combining Features</h2><table class="border-collapse table-auto w-full" style="min-width: 75px"><colgroup><col style="min-width: 25px"><col style="min-width: 25px"><col style="min-width: 25px"></colgroup><tbody><tr class="border-b dark:border-gray-600"><th class="border-b dark:border-gray-600 bg-gray-100 dark:bg-gray-700 font-medium" colspan="1" rowspan="1"><p>Formatting</p></th><th class="border-b dark:border-gray-600 bg-gray-100 dark:bg-gray-700 font-medium" colspan="1" rowspan="1"><p>Lists</p></th><th class="border-b dark:border-gray-600 bg-gray-100 dark:bg-gray-700 font-medium" colspan="1" rowspan="1"><p>Alignment</p></th></tr><tr class="border-b dark:border-gray-600"><td class="border border-gray-200 dark:border-gray-600 p-2" colspan="1" rowspan="1"><p><strong>Bold</strong> and <em>italic</em></p></td><td class="border border-gray-200 dark:border-gray-600 p-2" colspan="1" rowspan="1"><ul class="list-disc list-outside ml-4"><li class="pl-1"><p>Item 1</p></li><li class="pl-1"><p>Item 2</p></li></ul></td><td class="border border-gray-200 dark:border-gray-600 p-2" colspan="1" rowspan="1"><p>Centered text</p></td></tr><tr class="border-b dark:border-gray-600"><td class="border border-gray-200 dark:border-gray-600 p-2" colspan="1" rowspan="1"><p><span style="color: rgb(255, 0, 0)">Colored</span> text</p></td><td class="border border-gray-200 dark:border-gray-600 p-2" colspan="1" rowspan="1"><ol class="list-decimal list-outside ml-4"><li class="pl-1"><p>First</p></li><li class="pl-1"><p>Second</p></li></ol></td><td class="border border-gray-200 dark:border-gray-600 p-2" colspan="1" rowspan="1"><p>Right aligned</p></td></tr></tbody></table>
`;
function App() {
  const [content, setContent] = useState(demoContent)

  return (
    <div className="w-screen mx-auto p-4 ">
      <h1 className="text-3xl text-center font-bold mb-4">Rich Editor Test</h1>
      
      {/* Basic usage */}
      <div className="mb-8 mx-auto max-w-2/3">
        <RichEditor
        className='bg-[#292a2c]'
          content={content}
          onUpdate={(editor) => {
            setContent(editor.getHTML())
          }}
          // showToolbar={false}
          // editable={false}          
        />
      </div>

      {/* Editor with all features */}
      {/* <div className="mb-8">
        <h2 className="text-xl mb-2">Full-Featured Editor</h2>
        <RichEditor
          content="<h1>Welcome!</h1><p>This is a test of all features.</p>"
          placeholder="Start writing..."
          editable={true}
          autofocus={true}
          showToolbar={true}
          onUpdate={(editor) => {
            console.log('Content updated:', editor.getHTML())
          }}
          onBlur={(editor) => {
            console.log('Editor blurred')
          }}
          onFocus={(editor) => {
            console.log('Editor focused')
          }}
        />
      </div> */}

      {/* Display the HTML content */}
      <div className="mt-4 rounded-md border mx-auto max-w-2/3 overflow-x-auto">
        <h3 className="text-lg mb-2">Generated HTML:</h3>
        <pre className=" p-4 rounded">
          {content}
        </pre>
      </div>
      <div className='mx-auto border bg-white text-black max-w-2/3 mt-4 p-4'>
        <h1 className="text-3xl"> Rendered content</h1>
        <div
        className='bg-muted'

        dangerouslySetInnerHTML={{__html: content}}
        />

        
      </div>
    </div>
  )
}

export default App