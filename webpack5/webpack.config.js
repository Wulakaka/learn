const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    mode: 'production',
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /.s[ac]ss$/i,
                use: [
                  // creates `style` nodes from JS string
                  "style-loader",
                  // translates CSS into CommonJS
                  "css-loader",
                  // complies Sass to CSS
                  "sass-loader"
                ]
            }
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title:'Caching'
        })
    ],
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    optimization: {
        // 使构建过程中vendor不更改hash值
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor:{
                    test: /[\\/]node_modules[\\/]/,
                    name:'vendors',
                    chunks: "all"
                }
            }
        }
    }
}
