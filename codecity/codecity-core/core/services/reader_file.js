module.exports = function readerFile(){
	var fs 			= require('fs');
	var self 	  = this;

	self.readInput = function(filename){
		var code = fs.readFileSync(filename);
		return code;
	}
}