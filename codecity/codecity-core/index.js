module.exports = {
    execute: function(file) {
			// Class
			var Neighborhood = require('./core/city/neighborhood.js');

			// Custom Services
			var parser     = require('./core/services/parser.js');
			var readerFile = require('./core/services/reader_file.js');

			var reader     = new readerFile();

			var code = reader.readInput(file);
			var ast  = parser.parseCode(code);

			// Identify files
			return new Neighborhood(file, code, ast);
    }
}



