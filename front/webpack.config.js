const path = require('path')

module.exports = {
    entry: {laserpointer: './src/laserpointer.ts', slides: './src/slides.ts'},
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'public', 'js')
    },
};