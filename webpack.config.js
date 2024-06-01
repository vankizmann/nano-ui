const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let config = {
    entry: ["./src/index.js"],
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
        ],

    },
    externals: {
        'vue': {
            root: 'Vue', commonjs2: 'vue', commonjs: 'vue', amd: 'vue'
        },
        'moment': {
            root: 'moment', commonjs2: 'moment', commonjs: 'moment', amd: 'moment'
        },
        '@kizmann/pico-js': {
            root: 'pi', commonjs2: '@kizmann/pico-js', commonjs: '@kizmann/pico-js', amd: '@kizmann/pico-js'
        }
    },
    plugins: []
};

let style = {
    entry: ["./src/index.scss"],
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
        ],

    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'nano-ui.css'
        })
    ]
};

let light = {
    entry: ["./themes/light/index.scss"],
    module: {
        rules: [
            {
                test: /\.scss$/,
                include: [
                    path.resolve('themes')
                ],
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'
                ]
            }
        ],

    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'light.css'
        })
    ]
};

let docs = {
    entry: ["./docs/src/scss/index.scss"],
    module: {
        rules: [
            {
                test: /\.scss$/,
                include: [
                    path.resolve('./docs/src')
                ],
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'
                ]
            }
        ],

    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: './dist/docs.css'
        })
    ]
};

module.exports = function (env, argv) {

    config.mode = argv.mode;

    if ( argv.mode === 'development' ) {
        config.devtool = 'eval-source-map';
    }

    if ( argv.mode === 'production' ) {
        config.devtool = 'source-map';
    }

    /**
     * @const __dirname
     */

    let bundlerPackage = Object.assign({

        output:{
            filename: "nano-ui.js",
            path: path.resolve(__dirname, "dist"),
            library: 'Nano',
            libraryTarget: "umd",
        }

    }, config);

    let stylePackage = Object.assign({

        output: {
            filename: ".ignore.js",
            path: path.resolve(__dirname, "dist"),
        }

    }, style);

    let lightPackage = Object.assign({

        output: {
            filename: ".ignore.js",
            path: path.resolve(__dirname, "dist/themes"),
        }

    }, light);

    let docsPackage = Object.assign({

        output: {
            filename: "./dist/.ignore.js",
            path: path.resolve(__dirname, "docs"),
        }

    }, docs);

    if ( argv.mode === 'development' ) {
        return [
            bundlerPackage, stylePackage, lightPackage, docsPackage
        ];
    }

    let loaderOptions = new webpack.LoaderOptionsPlugin({
        minimize: true
    });

    bundlerPackage.plugins.push(loaderOptions);
    stylePackage.plugins.push(loaderOptions);
    lightPackage.plugins.push(loaderOptions);
    darkPackage.plugins.push(loaderOptions);

    let terserOptions = {
        mangle: true
    }

    let terser = new TerserPlugin({
        terserOptions, extractComments: false,
    });

    let optimization = {
        minimize: true, minimizer: []
    };

    optimization.minimizer.push(terser);

    bundlerPackage.optimization = optimization;
    stylePackage.optimization = optimization;
    lightPackage.optimization = optimization;
    darkPackage.optimization = optimization;

    return [
        bundlerPackage, stylePackage, lightPackage, //darkPackage
    ];
}