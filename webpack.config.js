const path = require('path');

const outputDir = path.resolve(__dirname, './src/js/');
const srcPath = path.join(__dirname, './src/vue/');
const TerserPlugin = require('terser-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

// const JsonMinimizerPlugin = require('json-minimizer-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

const pkg = require('./package.json');

const libraryName = pkg.name;

module.exports = {
	mode: 'development',
	// mode: 'production',
	entry: path.resolve(__dirname, `${srcPath}main.js`),
	devtool: false,
	performance: {
		hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000
	},
	output: {
		path: outputDir,
		publicPath: outputDir,
		filename: `${libraryName}.js`,
		library: libraryName,
		libraryTarget: 'umd',
		umdNamedDefine: true
	},
	plugins: [new VueLoaderPlugin()],
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
				loader: require.resolve('url-loader'),
				options: {
					limit: 10000,
					name: 'img/[name].[hash:8].[ext]'
				}
			}
			//
			// {
			// 	test: /\.json/i,
			// 	type: 'javascript/auto',
			// 	use: [
			// 		{
			// 			loader: 'file-loader',
			// 			options: {
			// 				name: '[name].[ext]'
			// 			}
			// 		}
			// 	]
			// }
		]
	},
	optimization: {
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					output: {
						comments: false
					}
				},
				extractComments: false
			})
			// ,
			// new JsonMinimizerPlugin({
			// 	minimizerOptions: {
			// 		space: '\t'
			// 	}
			// })
		]
	},
	resolve: {
		extensions: ['.js', '.vue'],
		alias: {
			vue$: 'vue/dist/vue.esm.js',
			'@': path.resolve('src')
		}
	}
};
