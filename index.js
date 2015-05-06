if (process.argv.length < 3) {
    console.log('Usage: analyze.js file.js');
    process.exit(1);
}


var filename = process.argv[2];
console.log('Reading ' + filename);
var code = fs.readFileSync(filename);
analyzeCode(code);
console.log('Done');