# What is this

This is very simple promise-based module to make system-level ping requests. Works in Windows / Linux / Mac.

# Requirements

Node 8+

# How to install

    npm install system-ping

# How to use
		
``` javascript
const ping = require( 'system-ping' );
ping( '127.0.0.1' ).then( ({ total, received }) => {
	console.log( `Sent ${total} packets, received ${received} packets` );
	if( total === received ){
		console.log( 'Ping was successful' );
	}
	else{
		console.warn( 'Some problems with host 127.0.0.1' );
	}
});
```
		
# Options

``` javascript
ping( '127.0.0.1', { 'packetsCount': 8 } ) // How much packets to send for this ping
```