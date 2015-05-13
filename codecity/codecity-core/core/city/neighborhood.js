module.exports = function Neighborhood(_filename, _code, _ast){
	var moo = require('mootools');

	var Building = require('./building.js');
	var self  = this;

	var name  = _filename;
	var ast   = _ast;
	var code  = _code;

	var buildings = [];
	var rest_code = [];

	self.show = function(){
		return buildings;
	}

	self.getBuilds = function(){
		return buildings;
	}

	var process = function(){
		identify_functions(ast, 0);
		console.log(buildings);
	}

	var identify_functions = function(val, nivel){
		var r = {};
		switch( typeOf(val) ) {
			case 'object':
				if( typeof(val['type']) == 'string' && (val['type'] == "FunctionExpression" || val['type'] == "FunctionDeclaration")) {
					buildings.push(new Building(val.type, val.id, val.params, val.body, nivel));
					nivel++;
				}
				Object.each(val, function(e) { identify_functions(e, nivel) });
			break;
			case 'array':
				val.each(function (e) {identify_functions(e, nivel);});
			break;
			default:
		}
		--nivel;
		return r;
	}

	var init = function(){
		process();
	}

	return init();
}