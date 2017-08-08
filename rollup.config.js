import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

export default {
  entry: 'lib/main.js',
  moduleName: 'zombrex',
  format: 'iife',
  plugins: [
      uglify(), 
      babel({
            exclude: 'node_modules/**'
      })
  ],
  dest: 'dist/zombrex.js'
};
