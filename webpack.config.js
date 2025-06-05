//@ts-check

'use strict';

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

//@ts-check
/** @typedef {import('webpack').Configuration} WebpackConfig **/

/** @type WebpackConfig */
const extensionConfig = {
	target: 'node', // VS Code extensions run in a Node.js-context 📖 -> https://webpack.js.org/configuration/node/
	mode: 'none', // this leaves the source code as close as possible to the original (when packaging we set this to 'production')

	entry: './src/extension.ts', // the entry point of this extension, 📖 -> https://webpack.js.org/configuration/entry-context/
	output: {
		// the bundle is stored in the 'dist' folder (check package.json), 📖 -> https://webpack.js.org/configuration/output/
		path: path.resolve(__dirname, 'dist'),
		filename: 'extension.js',
		libraryTarget: 'commonjs2',
	},
	externals: {
		vscode: 'commonjs vscode', // the vscode-module is created on-the-fly and must be excluded. Add other modules that cannot be webpack'ed, 📖 -> https://webpack.js.org/configuration/externals/
		// modules added here also need to be added in the .vscodeignore file
	},
	resolve: {
		// support reading TypeScript and JavaScript files, 📖 -> https://github.com/TypeStrong/ts-loader
		extensions: ['.ts', '.js'],
		alias: {
			'@commonCapabilities': path.resolve(__dirname, 'src/common-capabilities'),
			'@extensionFramework': path.resolve(__dirname, 'src/extension-framework'),
			'@utils': path.resolve(__dirname, 'src/utils'),
			'@templates': path.resolve(__dirname, 'src/templates'),
			'@models': path.resolve(__dirname, 'src/models'),
			'@fileSystem': path.resolve(__dirname, 'src/file-system'),
			'@angularDependencyExtractor': path.resolve(
				__dirname,
				'src/angular-dependency-extractor',
			),
		},
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'ts-loader',
					},
				],
			},
		],
	},
	devtool: 'nosources-source-map',
	infrastructureLogging: {
		level: 'log', // enables logging required for problem matchers
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'src', 'templates'), // Source: /home/fernando/gdlc-angular-extension/src/templates/
					to: path.resolve(__dirname, 'dist'), // Destination: /home/fernando/gdlc-angular-extension/dist/
					globOptions: {
						ignore: ['**/*.ts'],
					},
				},
			],
		}),
	],
};
module.exports = [extensionConfig];
