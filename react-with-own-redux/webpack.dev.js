const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'development',
	devServer: {
		host: 'localhost',
		port: 7000,
		open: true,
	},
	watch: false,
 	watchOptions: {
	    aggregateTimeout: 300,
	    poll: 1000
  	}
})

