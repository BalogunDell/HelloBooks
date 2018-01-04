const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.config');
require('dotenv').config();

module.exports = merge(common, {
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false,
      },
      minimize: true,
      sourceMap: true
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      }
    }),
    new webpack.EnvironmentPlugin({
      CLOUD_KEY: JSON.stringify(process.env.CLOUD_KEY),
      CLOUD_URL: JSON.stringify(process.env.CLOUD_URL),
      SECRET: JSON.stringify(process.env.SECRET)
    }),
  ],
});
