'use strict';

/* eslint-env node */

const path = require( 'path' );
const { DefinePlugin } = require( 'webpack' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

module.exports = ( env = {} ) => {
	const main = [ path.join( process.cwd(), 'src', 'scripts', 'app.js' ) ];
	const metropolis = [ path.join( process.cwd(), 'metropolis-web-page', 'src', 'scripts', 'app.js' ) ];

	if ( env.analytics ) {
		main.push( path.join( process.cwd(), 'src', 'scripts', 'analytics.js' ) );
		metropolis.push( path.join( process.cwd(), 'src', 'scripts', 'analytics.js' ) );
	}

	return {
		entry: { main, metropolis },

		output: {
			filename: '[name].[contenthash].js',
			path: path.join( process.cwd(), 'dist' ),
			publicPath: '/'
		},

		module: {
			rules: [
				{
					test: /\.scss$/,
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
						},
						'css-loader',
						'sass-loader'
					]
				},
				{
					test: /.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
					use: 'file-loader'
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
			new CleanWebpackPlugin(),
			new HtmlWebpackPlugin( {
				chunks: [ 'main' ],
				template: path.join( process.cwd(), 'src', 'index.html' )
			} ),
			new HtmlWebpackPlugin( {
				chunks: [ 'metropolis' ],
				template: path.join( process.cwd(), 'metropolis-web-page', 'src', 'index.html' ),
				filename: 'metropolis.html'
			} ),
			new MiniCssExtractPlugin( {
				filename: '[name].[contenthash].css'
			} ),
			new DefinePlugin( {
				ANALYTICS: JSON.stringify( env.analytics )
			} )
		]
	};
};
