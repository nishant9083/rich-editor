import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

const packageJson = await import('./package.json', {
  assert: { type: 'json' }
}).then(module => module.default);

export default {
  input: 'src/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json' }),
    postcss({
      plugins: [
        tailwindcss(),
        autoprefixer(),
      ],
      config: {
        path: './postcss.config.mjs',
      },
      extensions: ['.css'],
      minimize: true,
      inject: true,
      extract: "styles.css",
    }),
  ],
}; 