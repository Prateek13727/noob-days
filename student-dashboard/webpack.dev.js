const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		host: 'localhost',
		port: 7000,
		open: true,
		proxy: {
      		'/netflix': 'http://localhost:8000'
    	}
	},
	watch: true,
 	watchOptions: {
	    aggregateTimeout: 300,
	    poll: 1000
  	}
})

