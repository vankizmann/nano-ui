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
            root: 'Vue', global: 'Vue', commonjs2: 'vue', commonjs: 'vue', amd: 'vue'
        },
        'moment': {
            root: 'moment', global: 'moment', commonjs2: 'moment', commonjs: 'moment', amd: 'moment'
        },
        '@kizmann/pico-js': {
            root: 'pi', global: 'pi', commonjs2: '@kizmann/pico-js', commonjs: '@kizmann/pico-js', amd: '@kizmann/pico-js'
        }
    },
    plugins: []
};

let style = {
    entry: ["./nano/index.scss"],
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
        ],

    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'nano-ui.css'
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
            filename: "nano-ui.esm.js",
            path: path.resolve(__dirname, "dist"),
            libraryTarget: "umd",
        }

    }, config);

    let globalPackage = Object.assign({

        output: {
            filename: "nano-ui.js",
            path: path.resolve(__dirname, "dist"),
            library: "nano",
            libraryTarget: "var",
        }

    }, config);

    Object.keys(globalPackage.externals).forEach((key) => {
        globalPackage.externals[key] = globalPackage.externals[key].root;
    });

    let stylePackage = Object.assign({

        output: {
            filename: ".ignore.js",
            path: path.resolve(__dirname, "dist"),
        }

    }, style);

    if ( argv.mode === 'development' ) {
        return [bundlerPackage, globalPackage, stylePackage];
    }

    let loaderOptions = new webpack.LoaderOptionsPlugin({
        minimize: true
    });

    bundlerPackage.plugins.push(loaderOptions);
    globalPackage.plugins.push(loaderOptions);
    stylePackage.plugins.push(loaderOptions);

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
    globalPackage.optimization = optimization;
    stylePackage.optimization = optimization;

    return [bundlerPackage, globalPackage, stylePackage];
}