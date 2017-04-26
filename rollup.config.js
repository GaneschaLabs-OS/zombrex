import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

export default {
  entry: 'lib/main.js',
  moduleName: 'zombrex',
  format: 'iife',
  plugins: [
      uglify(), 
      babel({
            exclude: 'node_modules/**' // only transpile our source code
      })
  ],
  dest: 'dist/zombrex.js'
};
