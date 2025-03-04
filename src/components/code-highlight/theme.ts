interface StyleObject {
  [key: string]: string;
}

interface ThemeStyles {
  [selector: string]: StyleObject;
}

export const codeTheme: ThemeStyles = {
  'pre': {        
    'font-family': 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    'font-size': '0.875em',
    'line-height': '1.7142857',
    'border-radius': '0.375rem',
    'padding': '1.1428571em 1.4285714em',
  },
  'code[class*="language-"]': {
    'color': 'var(--tw-prose-pre-code)',
    'background': 'none',
    'font-family': 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    'text-align': 'left',
    'white-space': 'pre',
    'word-spacing': 'normal',
    'word-break': 'normal',
    'word-wrap': 'normal',
    'line-height': '1.5',
    'tab-size': '4',
    'hyphens': 'none'
  },
  '.hljs-comment': {
    'color': '#606060', // Darker shade for comments
    'font-style': 'italic',
  },
  '.hljs-keyword': {
    'color': '#4A90E2', // Darker shade for keywords
    'font-weight': '600',
  },
  '.hljs-built_in': {
    'color': '#3DAF9E', // Darker shade for built-in
  },
  '.hljs-string': {
    'color': '#B76E5D', // Darker shade for strings
  },
  '.hljs-number': {
    'color': '#A3C6A8', // Darker shade for numbers
  },
  '.hljs-function': {
    'color': '#B8B400', // Darker shade for functions
  },
  '.hljs-title': {
    'color': '#B8B400', // Darker shade for titles
    'font-weight': '600',
  },
  '.hljs-params': {
    'color': '#7BB9E5', // Darker shade for parameters
  },
  '.hljs-variable': {
    'color': '#7BB9E5', // Darker shade for variables
  },
  '.hljs-operator': {
    'color': '#B0B0B0', // Darker shade for operators
  },
  '.hljs-punctuation': {
    'color': '#B0B0B0', // Darker shade for punctuation
  },
  '.hljs-property': {
    'color': '#7BB9E5', // Darker shade for properties
  },
  '.hljs-tag': {
    'color': '#4A90E2', // Darker shade for tags
  },
  '.hljs-attr': {
    'color': '#7BB9E5', // Darker shade for attributes
  },
  // Dark mode overrides
//   '.dark pre': {
//     'background-color': 'var(--tw-prose-pre-bg, #1e242a)',
//     'color': 'var(--tw-prose-pre-code, #d4d4d4)',
//   },
}; 