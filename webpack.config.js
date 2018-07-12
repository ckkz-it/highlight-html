let path = require('path');
let webpack = require('webpack');

let conf = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'main.js'
  },
  devServer: {
    overlay: true,
    watchContentBase: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}

module.exports = (env, options) => {
  let production = options.mode == 'production';

  conf.devtool = production ? false : 'eval-sourcemap';

  return conf;
};