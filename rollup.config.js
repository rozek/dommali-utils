// see https://github.com/rozek/build-configuration-study

import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser'

export default {
  input: './src/dommali-utils.ts',
  output: [
    {
      file:     './dist/dommali-utils.js',
      format:   'umd', // builds for both Node.js and Browser
      name:     'dommaliUtils', // required for UMD modules
      sourcemap:true,
      plugins: [terser({ format:{ comments:false, safari10:true } })],
    },{
      file:     './dist/dommali-utils.esm.js',
      format:   'esm',
      sourcemap:true,
    }
  ],
  plugins: [
    typescript(),
  ],
};