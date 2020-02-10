const path = require('path');

module.exports = {
    mode: 'production',
    entry: './dist/index.js',
    devtool: 'inline-source-map',

    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'braintree-isomorphic-functions.js',
        path: path.resolve(__dirname, 'lib'),
        library: 'braintreeFunctions',
        libraryTarget: 'umd'
    },
};