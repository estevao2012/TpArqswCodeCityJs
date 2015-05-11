module.exports = function Neighborhood(_filename, _code, _ast){
	var moo = require('mootools');
	// var Class = moo.Class, Options = moo.Options, Core = moo.Core, Object = moo.Object;

	var Building = require('./building.js');
	var self  = this;

	var name  = _filename;
	var ast  = _ast;
	var code = _code;

	var buildings = [];
	var rest_code = [];

	self.show = function(){
		return buildings;
	}

	self.getBuilds = function(){
		return buildings;
	}

	var funcs = [];
	var process = function(){
		// ast['body'].forEach(function(elem){
		// 	if(elem.type == "FunctionDeclaration"){
		// 		buildings.push(new Building(elem.id, elem.params, elem.body.body));
		// 	}else{
		// 		console.log(elem);
		// 		rest_code.push(elem);
		// 	}
		// });
		console.log(counter(ast));
		console.log(funcs);
	}

	var counter = function(val) {
		var r = {}, s, t;
		switch( typeOf(val) ) {
			case 'object':
				if( typeof(val['type']) == 'string' ) {
					t = val['type'];
					if( typeof(r[t]) == 'undefined' ) {
						r[t] = 1;
					} else {
						++r[t];
					}

					if(val['type'] == "FunctionExpression"){
						funcs.push(val);
					}
				}

				Object.each(val, function(e) {
					Object.each(counter(e), function(e, i) {
						if(typeof(r[i])=='undefined') {
							r[i] = 0;
						}
						r[i] += e;
					});
				});
			break;
			case 'array':
				val.each(function (e) {
					Object.each(counter(e), function(e, i) {
						if(typeof(r[i])=='undefined') {
							r[i] = 0;
						}
						r[i] += e;
					});
				});
			break;
			default:
		}
		
		return r;
	}

	var init = function(){
		process();
	}

	return init();
}