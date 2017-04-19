const path = require("path")
const webpack = require("webpack")
const webpackTargetElectronRenderer = require('webpack-target-electron-renderer')

module.exports = {
    entry: path.resolve(__dirname, "src/app.js"),
    output: {
        path: path.resolve(__dirname, "public/js"),
        filename: "bundle.js",
        library: "EntryPoint",
        libraryTarget: 'var',
    },
    watch: true,
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: "babel-loader",
            }
        ]
    },
    node: {
        fs: "empty"
    },
    target: "electron-renderer",
    plugins: [
        new webpack.IgnorePlugin(/vertx/),
    ]
}