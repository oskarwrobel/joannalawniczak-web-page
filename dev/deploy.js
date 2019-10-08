'use strict';

/* eslint-env node */

const path = require( 'path' );
const deploy = require( '@oskarwrobel/deploy-tools/src/deploy' );

const domain = 'joannalawniczak.com';
const dest = `domains/${ domain }/public_html`;
const tmp = `domains/${ domain }/tmp`;

const username = process.env.MYDEVIL_USERNAME;
const host = process.env.MYDEVIL_HOST;
const privateKey = process.env.MYDEVIL_KEY;

deploy( {
	username,
	host,
	privateKey,
	execute( local, remote ) {
		local( 'npm run build:production' );

		// Create directory structure if it is missing.
		tmp.split( '/' ).reduce( ( result, part ) => {
			result = path.join( result, part );
			remote( `mkdir ${ result }`, { silent: true } );

			return result;
		}, '' );

		local( `rsync -a ${ path.join( process.cwd(), 'dist', '/' ) } ${ username }@${ host }:${ tmp }` );

		remote( `rm -rf ${ dest }` );
		remote( `mv ${ tmp } ${ dest }` );
	}
} )
	.then( () => {
		console.log( 'Deployed.' );
	} )
	.catch( err => {
		console.log( err );
		process.exit( 1 );
	} );
