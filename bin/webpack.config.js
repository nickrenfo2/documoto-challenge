const path = require('path');
require('dotenv').load({path: path.join(__dirname, '../.env')});

module.exports = env => ({
	devtool: "cheap-module-source-map",
	entry: {
		index: './src/index/index.js',
		page_view: './src/page_view/index.js',
	},
	watch: false,
	watchOptions: {
		ignored: [/node_modules/, 'public/dist/*']
	},
	output: {
		path: path.join(__dirname, '../public/dist/'),
		filename: 'bundle.[name].js',
		publicPath: '/public/'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				// include: path.join(__dirname, 'app/frontend'),
				exclude: /node_modules/,
				query: {
					presets: ['es2015', 'stage-2', 'react']
				}
			}
		]
	}
});