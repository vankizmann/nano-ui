let postcssAutoprefixer = require('autoprefixer')();

let postcssSvg = require('postcss-inline-svg')({
    paths: [__dirname + '/nano/root/image']
});


module.exports = {
    plugins: [
        postcssSvg, postcssAutoprefixer
    ],
};