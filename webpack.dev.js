const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
// plugins
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    compress: true,
    port: 9000,
    historyApiFallback: true,
    host: "0.0.0.0",
    clientLogLevel: "debug",
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.(s?css|sass)$/,
        use: [
          "cache-loader",
          "style-loader",
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ],
        include: [path.resolve(__dirname, "src")]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: {
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]",
            outputPath: "images"
          }
        },
        include: [path.resolve(__dirname, "src")]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
    // new BundleAnalyzerPlugin({ openAnalyzer: false, port: "8888" })
  ]
});
