import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import eslint from 'rollup-plugin-eslint';

export default {
  input: 'lib/main.js',
  plugins: [
      eslint({
          envs: ['browser'],
          throwOnError: true,
          configFile: './eslint.json'
      }),
      uglify(), 
      babel({
            exclude: 'node_modules/**'
      })
  ],
  output: {
    file: 'dist/zombrex.js',
    format: 'iife',
    name: 'zombrex'
  }
};
