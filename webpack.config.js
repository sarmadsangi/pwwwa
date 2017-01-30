var path = require('path')
var webpack = require('webpack')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin

module.exports = {
  entry: {
  	main: ['./client.js']
  },
  output: {
    filename: '[name].[hash].js',
    chunkFilename: 'page.[id].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'
  },
  module: {
	loaders: [
		{
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'babel-loader',
			query: {
				presets: ["react", "env"]
			}
		}
	]
  },
	plugins: [
		new CleanWebpackPlugin(['dist']),

		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			minChunks: Infinity,
			filename: '[name].[hash].js',
		}),

		new StatsWriterPlugin({
			filename: 'stats.json'
		})
	]
}