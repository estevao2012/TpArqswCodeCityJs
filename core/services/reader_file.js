module.exports = function readerFile(){
	var fs 			= require('fs');
	var self 	  = this;

	self.readInput = function(){
		if (process.argv.length < 3) {
		    console.log('Usage: index.js file.js');
		    process.exit(1);
		}

		var code = fs.readFileSync( process.argv[2] );
		return code;
	}
}