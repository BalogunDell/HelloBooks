const merge = require('webpack-merge');
const webpack = require('webpack');
const DotEnv = require('dotenv-webpack');
const devConfig = require('./webpack.common.config');


module.exports = merge(devConfig, {
  devServer: {
    contentBase: './dist',
    historyApiFallback: true
  },
  devtool: 'cheap-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      },
    }),
    new DotEnv({
      path: './.env',
      systemvars: true
    })
  ],
});
