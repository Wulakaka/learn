const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',

    entry: './src/index.js',
    devtool: 'inline-source-map', // 用于追踪资源
    devServer: {
        static: './dist', // 指定从什么位置查找资源
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Development'
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true, // 清除目录
    },
}