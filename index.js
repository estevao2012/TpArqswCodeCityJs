// Class
var City 			   = require('./core/city/city.js'),
		Neighborhood = require('./core/city/neighborhood.js');

// Custom Services
var parser     = require('./core/services/parser.js');
var readerFile = require('./core/services/reader_file.js');
var reader     = new readerFile();


var code = reader.readInput();
var ast  = parser.parseCode(code);

// Identify files
neighbor = new Neighborhood(process.argv[2], code, ast);

// Mensure Metrics By File
console.log(neighbor.show());

// Draw Objects By File
console.log('Done');