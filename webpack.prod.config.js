const webpack = require('webpack');
const merge = require('webpack-merge');
const DotEnv = require('dotenv-webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.config');

module.exports = merge(common, {
  devtool: 'source-map',
  entry: './client/src/index.js',
  plugins: [
    new UglifyJsPlugin({
      sourceMap: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      }
    }),
    new DotEnv({
      path: './.env',
      systemvars: true
    })
  ],
});
