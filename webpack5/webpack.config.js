const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    mode: 'development',
    entry: {
        index: {
            import: './src/index.js',
            dependOn: 'shared'
        },
        another: {
            import: './src/another-module.js',
            dependOn: 'shared'
        },
        shared:'lodash'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title:'代码分离'
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    // todo 不设置会引起麻烦 https://bundlers.tooling.report/code-splitting/multi-entry/
    optimization: {
        runtimeChunk: 'single'
    }
}
