import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import eslint from 'rollup-plugin-eslint';

export default {
  entry: 'lib/main.js',
  moduleName: 'zombrex',
  format: 'iife',
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
  dest: 'dist/zombrex.js'
};
