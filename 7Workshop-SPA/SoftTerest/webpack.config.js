const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/init.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  // watch: true,
  devServer: {
    contentBase: './dist',
    /* stats: {
      children: true
    } */
  },
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [{
        // test: /\.css$/,
        test: /\.(sass|less|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /index\.html$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
      {
        test: /\.(jpg|png|eps|svg)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          publicPath: 'images',
        },
      },
    ],
  },
};