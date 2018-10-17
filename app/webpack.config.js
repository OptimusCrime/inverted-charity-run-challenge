const path = require('path');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = (env, argv) => {

  const cssLoaders = argv.mode === 'development' ? [
    'style-loader',
    'css-loader',
    'less-loader',
  ] : [
    MiniCssExtractPlugin.loader,
    'css-loader',
    'less-loader',
  ];

  const htmlPlugin = new HtmlWebpackPlugin({
    template: './src/index.html',
    chunks: true
  });

  const plugins = argv.mode === 'development' ? [ htmlPlugin ] : [
    new CleanWebpackPlugin([
      'dist/*',
    ], {
      exclude: ['.gitignore']
    }),
    htmlPlugin,
    new MiniCssExtractPlugin(),
    new OptimizeCSSAssetsPlugin(),
  ];

  return {
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, argv.mode === 'development' ? 'dist' : 'prod'),
      chunkFilename: 'vendor.js',
      pathinfo: false,
    },
    devtool: argv.mode === 'development' ? 'eval-source-map' : '',
    resolve: {
      extensions: ['.js', '.json', '.jsx']
    },
    watch: argv.mode === 'development',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        }, {
          test: /\.(less|css)$/,
          resolve: {
            extensions: [
              '.less',
              '.css'
            ],
          },
          use: cssLoaders,
        }, {
          test: /\.(png|gif|jpe?|eot|svg|ttf|woff|woff2)(\?[a-z0-9=&.]+)?$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        },
      ]
    },
    optimization: {
      minimizer: argv.mode === 'development' ? [] : [ new UglifyJsPlugin() ],
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            enforce: true,
            chunks: 'all'
          }
        }
      },
    },
    plugins: plugins
  }
};
