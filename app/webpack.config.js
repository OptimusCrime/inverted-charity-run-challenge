const path = require('path');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const CSS_LOADERS = [
  'css-loader',
  'less-loader',
];

const PLUGINS = [
  new HtmlWebpackPlugin({
    template: './src/index.html',
    chunks: true
  })
];

module.exports = (env, argv) => {

  if (argv.mode === 'development') {
    CSS_LOADERS.unshift('style-loader');
  }
  else {

    CSS_LOADERS.unshift(MiniCssExtractPlugin.loader);
  }

  if (argv.mode === 'production') {
    PLUGINS.push(
      new MiniCssExtractPlugin(),
      new OptimizeCSSAssetsPlugin(),
    );
  }

  return {
    output: {
      filename: argv.mode === 'development' ? 'dev.[name].js' : '[name].js?hash=[contenthash]',
      chunkFilename: argv.mode === 'development' ? 'dev.vendor.js' : 'vendor.js?hash=[contenthash]',

      path: path.resolve(__dirname, '..', 'server', 'react'),

      pathinfo: false,
      publicPath: 'static/'
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
          use: CSS_LOADERS,
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
    plugins: PLUGINS
  }
};
