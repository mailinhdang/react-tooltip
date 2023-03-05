import * as esbuild from 'esbuild'
import cssModulesPlugin from 'esbuild-css-modules-plugin'
import fs from 'fs'

const buildsConfig = [
  {
    format: 'esm',
    outfile: 'dist/react-tooltip.esm.js',
    minify: false,
  },
  {
    format: 'cjs',
    outfile: 'dist/react-tooltip.cjs.js',
    minify: false,
  },
  {
    format: 'iife',
    outfile: 'dist/react-tooltip.iife.js',
    minify: false,
  },
  {
    format: 'esm',
    outfile: 'dist/react-tooltip.js', // for styles be exported as `react-tooltip.css`
    minify: false,
  },
  {
    format: 'esm',
    outfile: 'dist/react-tooltip.esm.min.js',
    minify: true,
  },
  {
    format: 'cjs',
    outfile: 'dist/react-tooltip.cjs.min.js',
    minify: true,
  },
  {
    format: 'iife',
    outfile: 'dist/react-tooltip.iife.min.js',
    minify: true,
  },
  {
    format: 'esm',
    outfile: 'dist/react-tooltip.min.js',
    minify: true,
  },
]

const builds = buildsConfig.map(({ format, outfile, minify }) =>
  esbuild.build({
    entryPoints: ['./src/index.tsx'],
    bundle: true,
    outfile,
    format,
    treeShaking: true,
    minify,
    sourcemap: true,
    external: ['react', 'react-dom', 'prop-types'],
    plugins: [
      cssModulesPlugin({
        // inject: true,
        v2: true,
        v2CssModulesOption: {
          pattern: `react-tooltip__[local]_[hash]`,
        },
      }),
    ],
  }),
)

await Promise.all(builds)

// Remove all unecessary or duplicated files from `dist` folder after build
fs.unlink('./dist/react-tooltip.cjs.css', () => null) // generated by cjs build
fs.unlink('./dist/react-tooltip.esm.css', () => null) // generated by esm build
fs.unlink('./dist/react-tooltip.iife.css', () => null) // generated by iife build
fs.unlink('./dist/react-tooltip.cjs.min.css', () => null) // generated by minified cjs build
fs.unlink('./dist/react-tooltip.esm.min.css', () => null) // generated by minified esm build
fs.unlink('./dist/react-tooltip.iife.min.css', () => null) // generated by minified iife build
fs.unlink('./dist/react-tooltip.js', () => null) // generated by css build
fs.unlink('./dist/react-tooltip.min.js', () => null) // generated by minified css build
fs.unlink('./dist/react-tooltip.cjs.css.map', () => null) // generated by cjs build
fs.unlink('./dist/react-tooltip.esm.css.map', () => null) // generated by esm build
fs.unlink('./dist/react-tooltip.iife.css.map', () => null) // generated by iife build
fs.unlink('./dist/react-tooltip.cjs.min.css.map', () => null) // generated by minified cjs build
fs.unlink('./dist/react-tooltip.esm.min.css.map', () => null) // generated by minified esm build
fs.unlink('./dist/react-tooltip.iife.min.css.map', () => null) // generated by minified iife build
fs.unlink('./dist/react-tooltip.js.map', () => null) // generated by css build
fs.unlink('./dist/react-tooltip.min.js.map', () => null) // generated by minified css build
