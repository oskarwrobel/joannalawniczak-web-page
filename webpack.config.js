'use strict';

/* eslint-env node */

const path = require( 'path' );
const { DefinePlugin } = require( 'webpack' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const CopyPlugin = require( 'copy-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

module.exports = ( env = {}, argv = {} ) => {
	const isProduction = argv.mode === 'production';

	const entry = [ path.join( process.cwd(), 'src', 'scripts', 'app.js' ) ];

	if ( env.analytics ) {
		entry.push( path.join( process.cwd(), 'src', 'scripts', 'analytics.js' ) );
	}

	return {
		entry,

		output: {
			filename: '[name].[contenthash].js',
			path: path.join( process.cwd(), 'dist' ),
			publicPath: '/'
		},

		devtool: !isProduction ? 'inline-source-map' : false,

		module: {
			rules: [
				{
					test: /\.css$/,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
							options: {
								importLoaders: 1
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								map: false,
								plugins: () => [
									require( 'postcss-nested' )(),
									isProduction ? require( 'cssnano' )() : noop
								]
							}
						}
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
							attributes: {
								list: [
									{
										tag: 'img',
										attribute: 'src',
										type: 'src'
									},
									{
										tag: 'link',
										attribute: 'href',
										type: 'src'
									}
								]
							}
						}
					}
				}
			]
		},

		plugins: [
			new HtmlWebpackPlugin( {
				chunks: [ 'main' ],
				template: path.join( process.cwd(), 'src', 'index.html' )
			} ),
			new CopyPlugin( [
				{ from: path.join( process.cwd(), 'src', 'images', 'og-image.png' ), to: path.join( process.cwd(), 'dist' ) }
			] ),
			new MiniCssExtractPlugin( {
				filename: '[name].[contenthash].css'
			} ),
			new DefinePlugin( {
				ANALYTICS: JSON.stringify( env.analytics )
			} )
		]
	};
};

function noop() {
}
