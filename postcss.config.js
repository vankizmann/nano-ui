/**
 * @const __dirname
 */

let svgOptions = {
    paths: [__dirname + '/themes/basic/root/image']
};

module.exports = {
    plugins: [
        require('postcss-inline-svg')(svgOptions),
        require('autoprefixer')()
    ],
};