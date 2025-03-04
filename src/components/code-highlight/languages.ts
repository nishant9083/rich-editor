import { common, createLowlight } from 'lowlight';

// Import languages
import bash from 'highlight.js/lib/languages/bash';
import c from 'highlight.js/lib/languages/c';
import cpp from 'highlight.js/lib/languages/cpp';
import csharp from 'highlight.js/lib/languages/csharp';
import css from 'highlight.js/lib/languages/css';
import dart from 'highlight.js/lib/languages/dart';
import diff from 'highlight.js/lib/languages/diff';
import dockerfile from 'highlight.js/lib/languages/dockerfile';
import go from 'highlight.js/lib/languages/go';
import graphql from 'highlight.js/lib/languages/graphql';
import java from 'highlight.js/lib/languages/java';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import kotlin from 'highlight.js/lib/languages/kotlin';
import less from 'highlight.js/lib/languages/less';
import lua from 'highlight.js/lib/languages/lua';
import markdown from 'highlight.js/lib/languages/markdown';
import php from 'highlight.js/lib/languages/php';
import python from 'highlight.js/lib/languages/python';
import ruby from 'highlight.js/lib/languages/ruby';
import rust from 'highlight.js/lib/languages/rust';
import scala from 'highlight.js/lib/languages/scala';
import scss from 'highlight.js/lib/languages/scss';
import shell from 'highlight.js/lib/languages/shell';
import sql from 'highlight.js/lib/languages/sql';
import swift from 'highlight.js/lib/languages/swift';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import yaml from 'highlight.js/lib/languages/yaml';

// Create lowlight instance with common languages
export const lowlight = createLowlight(common);

// Register all languages
const languages = {
  bash,
  c,
  cpp,
  csharp,
  css,
  dart,
  diff,
  dockerfile,
  go,
  graphql,
  java,
  javascript,
  json,
  kotlin,
  less,
  lua,
  markdown,
  php,
  python,
  ruby,
  rust,
  scala,
  scss,
  shell,
  sql,
  swift,
  typescript,
  xml,
  yaml,
};

// Register each language with lowlight
Object.entries(languages).forEach(([name, language]) => {
  lowlight.register(name, language);
});

// Export supported languages for UI
export const supportedLanguages = [
  { name: 'Plain Text', value: 'text' },
  { name: 'Bash', value: 'bash' },
  { name: 'C', value: 'c' },
  { name: 'C++', value: 'cpp' },
  { name: 'C#', value: 'csharp' },
  { name: 'CSS', value: 'css' },
  { name: 'Dart', value: 'dart' },
  { name: 'Diff', value: 'diff' },
  { name: 'Dockerfile', value: 'dockerfile' },
  { name: 'Go', value: 'go' },
  { name: 'GraphQL', value: 'graphql' },
  { name: 'Java', value: 'java' },
  { name: 'JavaScript', value: 'javascript' },
  { name: 'JSON', value: 'json' },
  { name: 'Kotlin', value: 'kotlin' },
  { name: 'Less', value: 'less' },
  { name: 'Lua', value: 'lua' },
  { name: 'Markdown', value: 'markdown' },
  { name: 'PHP', value: 'php' },
  { name: 'Python', value: 'python' },
  { name: 'Ruby', value: 'ruby' },
  { name: 'Rust', value: 'rust' },
  { name: 'Scala', value: 'scala' },
  { name: 'SCSS', value: 'scss' },
  { name: 'Shell', value: 'shell' },
  { name: 'SQL', value: 'sql' },
  { name: 'Swift', value: 'swift' },
  { name: 'TypeScript', value: 'typescript' },
  { name: 'XML', value: 'xml' },
  { name: 'YAML', value: 'yaml' },
].sort((a, b) => a.name.localeCompare(b.name)); 