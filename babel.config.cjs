module.exports = function (api) {

    api.cache(true);

    const presets = [
        '@babel/preset-typescript',
        ['@babel/preset-env', { targets: "defaults, not ie 11" }]
    ];

    const plugins = [
        ['@babel/plugin-transform-typescript', { allowDeclareFields: true }],
        "@babel/plugin-proposal-object-rest-spread",
        "@babel/plugin-proposal-export-default-from",
        "@babel/plugin-proposal-class-properties"
    ];

    return { presets,  plugins };
};
