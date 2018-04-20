const singleCommand = require( './singleCommand' );


/** @type {Boolean} */
const windows = /^win/.test( process.platform );

/**
@function
@param {String} host
@param {Object} [options]
@return {Promise} */
module.exports = async ( host, options = {}) => {
	/** @type {integer} */
	const packetsCount = options.packetsCount || 4;
	
  /** @type {String} */
  let command = windows
    ? `chcp 437 && ping -n ${packetsCount} ` + host
    : `ping -c ${packetsCount} ` + host;

  let string;
  try{
    /** @type {String} */
    string = await singleCommand( command );
  }
  catch( error ){
    let { consoleOutput } = error;
    if( !consoleOutput ) throw error;
    string = consoleOutput;
  }

  /** @type {Array<String>} */
  let lines = string.trim().split( '\n' )
    .map( line => line.trim() )
    .filter( line => line );

  let total, received;
  if( windows ){
    /** @type {String} */
    let line = lines.find( line => line.includes( 'Packets' ) );

    [ total, received ] = line.split( '=' ).slice( 1, 3 )
      .map( item => Number( item.split( ',' )[ 0 ].trim() ) );
    //Packets: Sent = 8, Received = 8, Lost = 0 (0% loss),
  }
  else{
    /** @type {String} */
    let line = lines.find( line => line.includes( 'packets' ) );

    [ total, received ] = line.split( ',' ).slice( 0, 2 )
      .map( item => Number( item.trim().split( ' ' )[ 0 ] ) );
    //4 packets transmitted, 4 received, 0% packet loss, time 3056ms
  }

  return { total, received };
};
