const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  watch: true,
  devServer: {
    contentBase: './dist',
  },
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/i,
        /* тествай за определен вид файлове; всеки файл, който намери, го тества дали
        отговаря на това условие => ако файла, който импортваме, отговаря на това условие,
        използвай даден loader за него: */
        use: [
          MiniCssExtractPlugin.loader,
          /* ще екстратктне css-a в отделен файл => няма да седи накрая някъде динамично
          забито в html-a nа страницата като в примера с 'style-loader',
                ами ще се екстрактне като отделен файл */
          'css-loader',
          /* влиза в css файла, прочита всичкия css и го зарежда в паметта
                => само го извлича от css file-a */
        ],
      },
      {
        test: /index\.html$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
        /* with `npm start` a 'index.html' file doesn't apper in the 'dist' folder, but
        everything still works correctly as if the file was there */
      },
    ],
  },
};
// "build": "webpack --watch"
