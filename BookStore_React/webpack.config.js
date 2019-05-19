const HTMLWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserWebpackPlugin = require('open-browser-webpack-plugin');

module.exports = {
    entry : './src/index.js',
    output : {
        filename : 'bundle.js',
        path : __dirname + '/dist'
    },
    mode: 'development',
    module : {
        rules : [
            {
                test : /\.js$/,
                exclude : /node_modules/,
                loader : 'babel-loader',
                options : {
                    presets : ['react']
                }
            },
            {
                test : /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template : './index.html'
        }),
        new OpenBrowserWebpackPlugin({
            url : 'http://localhost:3003'
        })
    ],
    devServer : {
        inline :true,
        port : 3003
    }
}