/**
 * @file webpack.config.js
 * @description Configuration file for webpack bundler.
 */

const path = require('path');

/**
 * Webpack configuration object.
 * @type {import('webpack').Configuration}
 */
module.exports = {
    entry: './src/index.jsx', // Entry point of your SDK
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js', // Output file
        library: 'CTH-SDK', // Library name
        libraryTarget: 'umd', // Universal Module Definition
        globalObject: 'this' // Compatibility with both browser and Node.js environments
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, // Include JSX files
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'] // Add React preset
                    },
                },
            },
            // Add rule for image files
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            // Add rule for CSS files
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'] // Automatically resolve these extensions
    }
};

