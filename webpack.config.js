const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const filename = process.env.NODE_ENV === 'production' ? 'liveui-react.production.min.js' : 'liveui-react.development.js';

module.exports = {
  mode: 'production',
  entry: './src/RemoteComponent/index.js',
  output: {
    path: path.resolve(__dirname, 'cjs'),
    filename,
    library: '@eclipse-muto/liveui-react',
    libraryTarget: 'commonjs2',
  },
  externals: {
    react: 'commonjs2 react',
    'react-native': 'commonjs2 react-native',
    '@eclipse-muto/liveui-core': 'commonjs2 @eclipse-muto/liveui-core',
  },
  devtool: 'source-map', // Avoid inline-*** and eval-*** use in production as they can increase bundle size and reduce the overall performance.
  plugins: [
    new MiniCssExtractPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
};
