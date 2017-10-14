/* eslint-disable */
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

const ENVIRONMENT = process.env.NODE_ENV
const PRODUCTION = ENVIRONMENT === 'production'
const SOURCEMAP = process.env.SOURCEMAP

const library = 'ear-tickler'
const filename = PRODUCTION ? `${library}.min.js` : `${library}.js`

const PLACEHOLDER = 'PLACEHOLDER'

const uglify = new webpack.optimize.UglifyJsPlugin({ minimize: true })
const ConfigPlugin = new webpack.DefinePlugin({ NODE_ENV: JSON.stringify(ENVIRONMENT) })
const HoistPlugin = new webpack.optimize.ModuleConcatenationPlugin()

const bundle = {
  entry: PLACEHOLDER,
  module: {
    loaders: [{
      test:    /\.js$/,
      loader:  'babel-loader',
      exclude: /node_modules/,
    }],
    rules: [{
      use: [{
        loader: 'babel-loader',
        options: {
          plugins: [
            'transform-class-properties',
            'transform-object-rest-spread',
          ],
          presets: ['es2015', 'react'],
        },
      }],
    }],
  },
  output: {
    filename: PLACEHOLDER,
    library,
    path:     PLACEHOLDER,
    libraryTarget:  'umd',
    umdNamedDefine: true,
  },
  plugins: PRODUCTION
    ? [ConfigPlugin, HoistPlugin, uglify]
    : [ConfigPlugin, HoistPlugin],
}

module.exports = [
  Object.assign({}, bundle, {
    /* Main JS Bundle */
    devtool: SOURCEMAP ? 'inline-source-map' : 'none',
    entry: `${__dirname}/source/application/Application.js`,
    externals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
    },
    output: Object.assign({}, bundle.output, {
      filename: 'application.js',
      path: `${__dirname}/build/js`,
    }),
  }),

  Object.assign({}, bundle, {
    /* Dependencies JS Bundle */
    entry: `${__dirname}/vendor/dependencies.js`,
    output: Object.assign({}, bundle.output, {
      filename: 'dependencies.js',
      path: `${__dirname}/build/js`,
    }),
  }),
]
