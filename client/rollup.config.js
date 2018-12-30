import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';

export default {
  input: './src/silent-authentication.ts',
  output: {
    file: './public/silent-authentication.js',
    format: 'iife',
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript(),
    json(),
  ]
}
