const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlCleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
	entry: {
		main: './src/index.js',
	},
 	devtool: 'source-map',
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
				use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'es2015', 'stage-1'],
                    }
                }
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
		new HtmlCleanWebpackPlugin(['./dist'])
	]
}