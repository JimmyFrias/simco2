/* eslint-disable no-undef */
module.exports = {
    presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-react'],
    plugins: [
        ['@babel/transform-runtime', {
            'sourceType': 'unambiguous',
            'absoluteRuntime': true,
            'corejs': 3,
            'helpers': true,
            'regenerator': true,
            'useESModules': false,
            'version': '7.0.0-beta.0'
        }], ['transform-class-properties'],
    ]
};
