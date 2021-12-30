const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: "development", // 使用development 模式打包，不要在正式环境中使用
    entry: './src/index.js',
    devtool: "inline-source-map", // 使用source-map
    devServer: {
        static: './dist' // 将 dist 目录下的文件 serve 到 localhost:8080 下
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Output Management',
            template: "./index.html" // 使用模板
        })
    ],
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, 'dist'),
        clean: true,  // 打包时清理目录
    }
}
