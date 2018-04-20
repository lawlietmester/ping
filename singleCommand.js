const { exec } = require( 'child_process' );


/**
@function
@param {String} command
@return {Promise<String>} */
module.exports = command => new Promise( ( resolve, reject ) => {
  exec(
    command,
    { 'timeout': 120 * 1000 },
    ( error, stdout, stderr ) => {
      if( error ){
        if( stdout ) error.consoleOutput = stdout;
        reject( error );
      }
      else resolve( stdout );
    }
  );
});
