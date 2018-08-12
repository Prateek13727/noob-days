const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'development',
	devServer: {
		host: 'localhost',
		port: 7001,
		open: true,
 		historyApiFallback: true,
 		proxy: {
      		'/invoice': 'http://localhost:3000'
    	}
	},
	watch: false,
 	watchOptions: {
	    aggregateTimeout: 300,
	    poll: 1000
  	}
})

