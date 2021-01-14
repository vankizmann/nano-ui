const path = require('path');
const webpack = require("webpack");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let libEsmExport = {
    entry: ['./src/index.js'],
    output: {
        filename: 'nano-ui.esm.js',
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
        'tiptap': {
            root: 'tiptap', commonjs: 'tiptap', commonjs2: 'tiptap', amd: 'tiptap'
        },
        'nano-js': {
            root: 'Nano', commonjs: 'nano-js', commonjs2: 'nano-js', amd: 'nano-js'
        }
    },
    plugins: [
        // new webpack.LoaderOptionsPlugin({
        //     minimize: true,
        //     debug: false,
        // }),
        // new UglifyJsPlugin({
        //     uglifyOptions: {
        //         output: {
        //             comments: false
        //         }
        //     },
        //     exclude: /node_modules/,
        // }),
        // new webpack.optimize.AggressiveMergingPlugin(),
    ]
};

let libWinExport = {
    entry: ['./src/index.js'],
    devtool: 'source-map',
    output: {
        filename: 'nano-ui.js',
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
        'tiptap': {
            root: 'tiptap', commonjs: 'tiptap', commonjs2: 'tiptap', amd: 'tiptap'
        },
        'nano-js': {
            root: 'Nano', commonjs: 'nano-js', commonjs2: 'nano-js', amd: 'nano-js'
        }
    },
    resolve: {
        alias: {
            vue$: path.resolve(__dirname, 'node_modules/vue/dist/vue.global.js')
        }
    },
    plugins: [
        // new webpack.LoaderOptionsPlugin({
        //     minimize: true,
        //     debug: false,
        // }),
        // new UglifyJsPlugin({
        //     uglifyOptions: {
        //         output: {
        //             comments: false
        //         }
        //     },
        //     exclude: /node_modules/,
        // }),
        // new webpack.optimize.AggressiveMergingPlugin(),
    ]
};

let libCssExport = {
    mode: 'development',
    entry: './nano/index.scss',
    output: {
        filename: '.lib.ignore.js',
        path: path.resolve('dist')
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                include: [
                    path.resolve('nano')
                ],
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'nano-ui.css'
        }),
    ]
};

let docsCssExport = {
    mode: 'development',
    entry: './docs/src/scss/index.scss',
    output: {
        filename: '.docs.ignore.js',
        path: path.resolve('docs/dist')
    },
    module: {
        rules: [
            {
                test: /\.(sass|scss)$/,
                include: [
                    path.resolve('docs/src')
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
    ]
};


module.exports = [
    libEsmExport, libWinExport, libCssExport, docsCssExport
];