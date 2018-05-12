'use strict';

/* eslint-env node */

const path = require( 'path' );
const deploy = require( 'deploy-tools/src/deploy' );

deploy( {
	username: 'oskarwrobel',
	host: 's8.mydevil.net',
	privateKey: '/Users/oskarwrobel/.ssh/id_rsa',
	src: path.join( process.cwd(), 'dist' ),
	dest: 'domains/oskarwrobel.pl/public_html'
} )
	.then( () => console.log( 'Deploy succeed.' ) )
	.catch( error => {
		console.log( 'Deploy failed.' );
		console.log( error );
		process.exit( 1 );
	} );
