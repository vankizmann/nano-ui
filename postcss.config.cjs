/**
 * @const __dirname
 */

let svgOptions = {
    paths: [__dirname + '/src/root/image']
};

module.exports = {
    plugins: [
        require('postcss-inline-svg')(svgOptions),
        require('autoprefixer')()
    ],
};