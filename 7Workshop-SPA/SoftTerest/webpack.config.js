const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/init.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    // assetModuleFilename: 'images/[hash][ext][query]',
    publicPath: '/' //!!!!!!! so that the images(background for the page in the common.css file) load using webpack V5 assets and not the in the above them example 'file-loader' from V4 (if using 'file-loader' instead I can just remove this current row for the publicPath)
    //!!!!!!!!!!!!!!!!!!!!!! // if I use path.resolve(__dirname, 'dist') for the publicPath, when starting the dev-server the `i ｢wds｣: webpack output is served from /` becomes `i ｢wds｣: webpack output is served from C:\\....` and only the static index.html file works

    //!!!! if I remove the images folder from 'dist', which I put there manually, all goes to hell -> this was before I started importing the needed images in the respective components, using import 'image' in the component itself and then writing this path in the 'src' of the '<img>' fixed this issue; now I can without a problem remove the whole dist folder and just run 'npm start' and all is well
  },
  // watch: true,
  devServer: {
    contentBase: './dist',
    //!!!!!!!!!!! to fix the problem where pages different from '/' wouldn't load on refresh the bottom row should be added(there is no problem with that with lite-server) -> https://ui.dev/react-router-cannot-get-url-refresh/ :
    historyApiFallback: true, //!!!!! => `404s will fallback to /index.html`
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
        //!!!!! otherwise I got a `Unexpected character '�' (1:0)` error when there was an import of a image as background for the page(in the common.css file)
        test: /\.(jpg|png|eps|svg)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          // name: '[name].[ext]',
          // publicPath: path.resolve(__dirname, 'dist/images'),
          publicPath: '/',
        },
      },
      /* {
        test: /\.(jpg|png|eps|svg)$/i,
        type: 'asset/resource',
      }, */
    ],
  },
};