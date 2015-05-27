var esprima = require('esprima');
module.exports = {
    parseCode: function(code) {
        var ast = esprima.parse(code, {loc: true});
        return ast;
    }
}


