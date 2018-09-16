const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlCleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
	entry: {
		main: './src/index.js',
	},
 	devtool: 'source-map',
	output: {
		filename: '[name].[hash].js',
		path: path.resolve('./dist'),
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude:  ['node_modules'],
				use: [{ loader: 'babel-loader' }],
			},
			// {
			// 	test: /\.s(c|a)ss$/,
			// 	use: [
			// 		{ loader: 'style-loader'},
			// 		{ loader: 'css-loader'},
			// 		{ loader: 'sass-loader'}
			// 	]
			// }
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'index.html'
		}),
		new HtmlCleanWebpackPlugin(['dist'])
	]
}