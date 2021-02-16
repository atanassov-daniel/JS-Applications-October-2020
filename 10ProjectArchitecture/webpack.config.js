const path = require('path');

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
  module: {
    rules: [
      {
        test: /\.css$/i,
        /* тествай за определен вид файлове; всеки файл, който намери, го тества дали
        отговаря на това условие => ако файла, който импортваме, отговаря на това условие,
        използвай даден loader за него: */
        use: [
          'style-loader', // взима от паметта това, което css-loader-a е произвел, и го слага като <style> tag директно вътре в html-a в header-a
          'css-loader', // влиза в css файла, прочита всичкия css и го зарежда в паметта => само го извлича от css file-a
        ],
      },
    ],
  },
};

// "build": "webpack --watch"
