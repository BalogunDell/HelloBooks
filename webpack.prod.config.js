const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.config');
require('dotenv').config();

console.log(process.env);
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
    new webpack.EnvironmentPlugin({
      CLOUD_KEY: JSON.stringify(process.env.CLOUD_KEY),
      CLOUD_URL: JSON.stringify(process.env.CLOUD_URL),
    }),
  ],
});
