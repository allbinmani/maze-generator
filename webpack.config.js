const path = require('path')
const MinifyPlugin = require("babel-minify-webpack-plugin");

const minifyOpts = {};
const pluginOpts = {};

module.exports = {
    entry: './src/MazeGenerator.js',
    output: {
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