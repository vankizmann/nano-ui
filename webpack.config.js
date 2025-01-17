const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let themes = {
    './src/index.scss': './nano-ui.css',
    './docs/src/scss/index.scss': '../docs/dist/docs.css',
    './themes/macos/index-dark.scss': './themes/dark.css',
    './themes/macos/index-light.scss': './themes/light.css',
}

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

    let themeList = [];

    Object.keys(themes).forEach((key, index) => {
        themeList[index] = themeFn(key, themes[key]);
    });

    if ( argv.mode === 'development' ) {
        return [
            bundlerPackage, ...themeList
        ];
    }

    let loaderOptions = new webpack.LoaderOptionsPlugin({
        minimize: true
    });

    bundlerPackage.plugins.push(loaderOptions);

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

    bundlerPackage.optimization = optimization;

    themeList.forEach((cfg) => {
        cfg.optimization = optimization;
    });

    return [
        bundlerPackage, ...themeList
    ];
}