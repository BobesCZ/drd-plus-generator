const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

const miniCssExtractPlugin = new MiniCssExtractPlugin({
  filename: "style.css"
});

const uglifyJsPlugin = new UglifyJsPlugin({
  sourceMap: true,
  parallel: true,
  uglifyOptions: {
    output: {
      comments: false,
    },
  },
});

const optimizeCSSAssetsPlugin = new OptimizeCSSAssetsPlugin({
  cssProcessor: require('cssnano'),
  cssProcessorPluginOptions: {
    preset: ['default', {
      discardComments: { removeAll: true },
    }],
  },
});

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';

  return {
    entry: ["./src/index.js", "./src/_styles/styles.less"],
    devtool: isDevelopment ? 'source-map' : false,
    optimization: {
      minimizer: isDevelopment ? [] : [uglifyJsPlugin, optimizeCSSAssetsPlugin],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: isDevelopment,
                sourceMap: true,
              }
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
              }
            },
            {
              loader: 'less-loader',
              options: {
                sourceMap: true,
              }
            }
          ]
        }
      ]
    },
    plugins: [htmlWebpackPlugin, miniCssExtractPlugin]
  };
};
