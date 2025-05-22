const fs = require('fs');
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let themes = {
    './src/index.scss': './nano-ui.css',
    './docs/src/scss/index-light.scss': '../docs/dist/light.css',
    './docs/src/scss/index-dark.scss': '../docs/dist/dark.css',
    './themes/macos/index-dark.scss': './themes/dark.css',
    './themes/macos/index-light.scss': './themes/light.css',
};

let libJs = {
    entry: ["./src/index.js"],
    module: {
        rules: [
            {
                test: /.jsx?$/,
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

let docJs = {
    entry: ["./docs/src/js/index.js"],
    module: {
        rules: [
            {
                test: /.jsx?$/,
                include: [
                    path.resolve('src'),
                    path.resolve('node_modules/@kizmann/pico-js'),
                ],
                loader: 'babel-loader',
                options: {
                    configFile: path.resolve('babel.config.js')
                },
            }
        ],
    },
    externals: {
        // '@kizmann/pico-js': {
        //     root: 'pi', commonjs2: '@kizmann/pico-js', commonjs: '@kizmann/pico-js', amd: '@kizmann/pico-js'
        // }
    }
};

let themeFn = (entry, target) => ({
    entry: [entry],
    module: {
        rules: [
            {
                test: /\.scss$/,
                include: [
                    path.resolve(entry.replace(/\/[^\/]+\.scss$/, ''))
                ],
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'
                ]
            }
        ],

    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: target
        })
    ],
    output: {
        filename: ".ignore.js",
        path: path.resolve(__dirname, "dist"),
    }
});

module.exports = function (env, argv) {

    libJs.mode = docJs.mode = argv.mode || 'development';

    let docConfig = {
        inject: false, base: 'https://nano-ui.local', logoSvg: '', loaderCss: ''
    }

    if ( fs.existsSync('./assets/nano-ui-dark.svg') ) {
        docConfig.logoSvg = fs.readFileSync('./assets/nano-ui-dark.svg', 'utf8');
    }

    if ( fs.existsSync('./docs/src/scss/theme/loader.scss') ) {
        docConfig.loaderCss = fs.readFileSync('./docs/src/scss/theme/loader.scss', 'utf8');
    }

    if ( argv.mode !== 'development' ) {
        docConfig.base = 'https://vankizmann.github.io/nano-ui';
    }

    if ( argv.mode === 'development' ) {
        libJs.devtool = 'eval-source-map';
    }

    if ( argv.mode === 'production' ) {
        libJs.devtool = 'source-map';
    }

    /**
     * @const __dirname
     */

    let libJsBundle = Object.assign({

        output: {
            filename: "nano-ui.js",
            path: path.resolve(__dirname, "dist"),
            library: 'Nano',
            libraryTarget: "umd",
        }

    }, libJs);

    let docJsBundle = Object.assign({

        output: {
            filename: "dist/docs.js",
            path: path.resolve(__dirname, "docs"),
        },

        plugins: [
            new HtmlWebpackPlugin(Object.assign({
                template: path.resolve('./docs/index.template.html'),
            }, docConfig))
        ],

    }, docJs);

    let themeList = [];

    Object.keys(themes).forEach((key, index) => {
        themeList[index] = themeFn(key, themes[key]);
    });

    if ( argv.mode === 'development' ) {
        return [
            libJsBundle, docJsBundle, ...themeList
        ];
    }

    let loaderOptions = new webpack.LoaderOptionsPlugin({
        minimize: true
    });

    libJsBundle.plugins.push(loaderOptions);
    docJsBundle.plugins.push(loaderOptions);

    themeList.forEach((cfg) => {
        cfg.plugins.push(loaderOptions);
    });

    let terserOptions = {
        mangle: true
    };

    let terser = new TerserPlugin({
        terserOptions, extractComments: false,
    });

    let optimization = {
        minimize: true, minimizer: []
    };

    optimization.minimizer.push(terser);

    libJsBundle.optimization = optimization;
    docJsBundle.optimization = optimization;

    themeList.forEach((cfg) => {
        cfg.optimization = optimization;
    });

    return [
        libJsBundle, docJsBundle, ...themeList
    ];
}
