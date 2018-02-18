#!/usr/bin/env node

const shell = require( 'shelljs' );
const NodeSSH = require( 'node-ssh' );
const path = require( 'path' );

const ssh = new NodeSSH();

const dest = 'domains/joannalawniczak.com';
const localTmp = path.join( process.cwd(), 'dist' );
const remoteTmp = path.join( dest, 'tmp' );

// Build app.
shell.exec( 'rm -rf ' + path.join( process.cwd(), 'dist' ) );
shell.exec( 'npm run build:production' );

// Copying files to the remote.
shell.exec( `rsync -a ${ path.join( localTmp, '/' ) } oskarwrobel@s8.mydevil.net:${ remoteTmp }` );

ssh.connect( {
	host: 's8.mydevil.net',
	username: 'oskarwrobel',
	privateKey: '/Users/oskarwrobel/.ssh/id_rsa'
} )
	.then( ssh => {
		return Promise.resolve()
			.then( () => ssh.execCommand( `rm -rf ${ path.join( dest, 'public_html' ) }` ) )
			.then( output => console.log( output.stdout, output.stderr ) )
			.then( () => ssh.execCommand( `mv ${ path.join( dest, 'tmp' ) } ${ path.join( dest, 'public_html' ) }` ) )
			.then( output => console.log( output.stdout, output.stderr ) )
			.then( () => ssh.connection.end() );
	} )
	.catch( err => console.log( err ) );
