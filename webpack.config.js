const path = require('path')
const MinifyPlugin = require("babel-minify-webpack-plugin");

const minifyOpts = {};
const pluginOpts = {};

module.exports = {
    entry: './src/index.js',
    output: {
        library: 'NodeMazeGenerator',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        path: path.resolve(__dirname, './dist'),
        filename: 'index.min.js',
    },
    plugins: [
        new MinifyPlugin(minifyOpts, pluginOpts)
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    }
}