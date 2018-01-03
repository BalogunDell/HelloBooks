
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const config = {
  entry: './client/src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  resolve: { extensions: ['.js', '.jsx', '.css'] },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: ['node_modules', 'materialize'],
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        exclude: ['node_modules', 'materialize'],
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
            publicPath: './'
          }
        }
      },
      {
        test: /\.scss$/,
        exclude: ['node_modules', 'materialize'],
        use: [
          {
            loader: 'style-loader'
          }, {
            loader: 'css-loader'
          }, {
            loader: 'sass-loader'
          }
        ],

      },

      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/',
            publicPath: './'
          }
        }
      },
    ]
  },

  plugins: [
    new htmlWebpackPlugin({
      title: 'Hellobooks Library',
      template: './client/src/index.html'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.$': 'jquery',
      'window.jQuery': 'jquery'
    })
  ],
  node: {
    dns: 'empty',
    net: 'empty',
    fs: 'empty'
  }
};

module.exports = config;
