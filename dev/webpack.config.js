'use strict';

const path = require( 'path' );
const webpack = require( 'webpack' );
const BabiliPlugin = require( 'babel-minify-webpack-plugin' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const CleanWebpackPlugin = require( 'clean-webpack-plugin' );

module.exports = ( env = {} ) => {
	const entry = [
		path.join( process.cwd(), 'src', 'scripts', 'app.js' )
	];

	if ( env.analytics ) {
		entry.push( path.join( process.cwd(), 'src', 'scripts', 'analytics.js' ) );
	}

	const webpackConfig = {
		resolve: {
			modules: [ 'node_modules' ],
		},

		entry,

		output: {
			path: path.join( process.cwd(), 'dist' ),
			filename: '[hash].app.js',
			publicPath: '/',
			libraryTarget: 'umd',
			umdNamedDefine: true,
			library: 'app'
		},

		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: [ 'node_modules' ],
					loader: 'babel-loader',
					query: {
						cacheDirectory: true
					}
				},
				{
					test: /\.scss$/,
					use: ExtractTextPlugin.extract( {
						publicPath: './',
						fallback: 'style-loader',
						use: [
							{
								loader: 'css-loader',
								options: {
									minimize: env.minify
								}
							},
							{
								loader: 'sass-loader'
							}
						]
					} )
				},
				{
					test: /.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
					use: 'file-loader?name=[name]-[hash:6].[ext]'
				},
				{
					test: /\.html$/,
					use: {
						loader: 'html-loader',
						options: {
							interpolate: true
						}
					}
				}
			]
		},

		plugins: [
			new CleanWebpackPlugin( [ 'dist/*.*' ], {
				root: process.cwd()
			} ),
			new ExtractTextPlugin( '[hash].app.css' ),
			new HtmlWebpackPlugin( {
				template: './src/index.html'
			} )
		]
	};

	if ( env.minify ) {
		webpackConfig.plugins = [
			...webpackConfig.plugins,
			new webpack.DefinePlugin( {
				'process.env': {
					'NODE_ENV': JSON.stringify( 'production' )
				},
				ANALYTICS: JSON.stringify( env.analytics )
			} ),
			new BabiliPlugin( null, { comments: false } ),
			new webpack.optimize.ModuleConcatenationPlugin()
		];
	}

	if ( env.sourcemaps ) {
		webpackConfig.devtool = 'inline-source-map';
	}

	return webpackConfig;
};
