const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
	entry: {
		main: './src/index.js',
	},
	output: {
		filename: '[name].js',
		path: path.resolve('./dist'),
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude:  /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.css$/,
				use: [
					{ loader: 'style-loader'},
					{ loader: 'css-loader'}
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'index.html'
		}),
		new CleanWebpackPlugin(['dist'])
	]
}