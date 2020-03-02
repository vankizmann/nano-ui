const path = require('path');
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let jsExtExport = {
    mode: 'development',
    entry: ['./src/index.js'],
    output: {
        filename: 'index.esm.js',
        path: path.resolve('dist'),
        library: 'nano-ui',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /.js$/,
                include: [
                    path.resolve('src'),
                ],
                loader: 'babel-loader',
                options: {
                    configFile: path.resolve('babel.config.js')
                },
            }
        ]
    },
    externals: {
        'vue': {
            root: 'Vue', commonjs: 'vue', commonjs2: 'vue', amd: 'vue'
        },
        'nano-js': {
            root: 'Nano', commonjs: 'nano-js', commonjs2: 'nano-js', amd: 'nano-js'
        }
    },
};

let jsWinExport = {
    mode: 'development',
    entry: ['@babel/polyfill/noConflict', './src/index.js'],
    devtool: 'source-map',
    output: {
        filename: 'index.js',
        path: path.resolve('dist'),
        library: 'nano-ui',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /.js$/,
                include: [
                    path.resolve('src'),
                ],
                loader: 'babel-loader',
                options: {
                    configFile: path.resolve('babel.config.js')
                },
            }
        ]
    },
    externals: {
        'vue': {
            root: 'Vue', commonjs: 'vue', commonjs2: 'vue', amd: 'vue'
        },
        'nano-js': {
            root: 'Nano', commonjs: 'nano-js', commonjs2: 'nano-js', amd: 'nano-js'
        }
    },
};

let cssModernExport = {
    mode: 'development',
    entry: './src/index.scss',
    output: {
        filename: '.ignore.js',
        path: path.resolve('dist')
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                include: [
                    path.resolve('src')
                ],
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'index.css'
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [ autoprefixer() ]
            }
        })
    ]
};


module.exports = [
    jsWinExport, jsExtExport, cssModernExport
];