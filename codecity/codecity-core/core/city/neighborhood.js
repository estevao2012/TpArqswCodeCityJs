module.exports = function Neighborhood(_filename, _code, _ast){
	var moo = require('mootools');

	var Building = require('./building.js');
	var self  = this;

	var name  = _filename;
	var ast   = _ast;
	var code  = _code;

	var buildings 			 = [];
	var rest_code 			 = [];
	var matriz_buildings = [];

	self.width  = 0;
	self.height = 0;

	self.show = function(){
		return buildings;
	}

	self.getBuilds = function(){
		return buildings;
	}

	var process = function(){
		identify_functions(ast, 0);
		matriz_buildings = position_buildings();
		self.width  = width_neighborhood();
		self.height = height_neighborhood();
	}

	var identify_functions = function(val, nivel){
		var r = {};
		switch( typeOf(val) ) {
			case 'object':
				if( typeof(val['type']) == 'string' && (val['type'] == "FunctionExpression" || val['type'] == "FunctionDeclaration")) {
					loc = val['loc']['end']['line'] - val['loc']['start']['line'];
					buildings.push(new Building(val.type, val.id, val.params, val.body, nivel, loc));
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

	var num_buildings_per_line = function(){
		return Math.ceil(buildings.length/2);
	}

	var position_buildings = function(){
		var num_buildings  = num_buildings_per_line();
		var matriz_predios = [];
		for(i = 0; i < num_buildings; i++){
			matriz_predios[i] = [];
			for(j = 0; j < num_buildings; j++ ){
				matriz_predios[i].push(buildings[(i+j)]);
			}
		}
		return matriz_predios;
	}

	var width_neighborhood = function(){
		var sum 		= 0;
		var max_sum = 0;

		for(i = 0; i < num_buildings_per_line(); i++){
			sum = 0;
			for(j = 0; j < num_buildings_per_line(); j++){
				sum += matriz_buildings[i][j].getNumVar();
			}

			if(sum > max_sum) max_sum = sum;
		}

		return max_sum;
	}

	var height_neighborhood = function(){
		var sum 		= 0;
		var max_sum = 0;

		for(i = 0; i < num_buildings_per_line(); i++){
			sum = 0;
			for(j = 0; j < num_buildings_per_line(); j++){
				sum += matriz_buildings[j][i].getNumVar();
			}

			if(sum > max_sum) max_sum = sum;
		}

		return max_sum;
	}

	self.getMatrizBuildings = function(){
		return maxtriz_buildings;
	}

	var init = function(){
		process();
	}

	return init();
}