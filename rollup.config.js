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
      uglify()
  ],
  output: {
    file: 'dist/zombrex.js',
    format: 'iife',
    name: 'zombrex',
    preferConst: true
  }
};
