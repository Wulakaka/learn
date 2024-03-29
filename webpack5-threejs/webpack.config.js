const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development", // 使用development 模式打包，不要在正式环境中使用
  entry: {
    main: "./src/index.js",
    "02-05": "./src/02-05.js",
  },
  devtool: "inline-source-map", // 使用source-map
  devServer: {
    static: "./dist", // 将 dist 目录下的文件 serve 到 localhost:8080 下
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Output Management",
      excludeChunks: ["02-05"],
    }),
    new HtmlWebpackPlugin({
      title: "02-05",
      excludeChunks: ["main"],
      filename: "02-05.html",
    }),
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true, // 打包时清理目录
  },
  module: {
    rules: [
      {
        test: /.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    },
  },
};
