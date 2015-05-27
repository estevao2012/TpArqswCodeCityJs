module.exports = {
    execute: function(file) {
			// Class
			var City 			   = require('./core/city/city.js'),
					Neighborhood = require('./core/city/neighborhood.js');

			// Custom Services
			var parser     = require('./core/services/parser.js');
			var readerFile = require('./core/services/reader_file.js');
			
			var reader     = new readerFile();

			var code = reader.readInput(file);
			var ast  = parser.parseCode(code);

			var city = new City();

			// Identify files
			neighbor = new Neighborhood(file, code, ast);
			city.addNeighborhood(neighbor);

			// Mensure Metrics By File
			// console.log(neighbor.show());

			// Draw Objects By File
			// console.log('Done');

			return city;
    }
}



