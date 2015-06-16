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


	self.show = function(){
		return buildings;
	}

	self.getBuilds = function(){
		return buildings;
	}

	self.getName = function(){
		return name;
	}

	var process = function(){
		identify_functions(ast, 0);
		matriz_buildings = position_buildings();
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

	self.num_buildings_per_line = function(){
		return Math.ceil(buildings.length/2);
	}

	var position_buildings = function(){
		var num_buildings  = self.num_buildings_per_line();
		var matriz_predios = [];
		var pointer = 0;

		for(i = 0; i < num_buildings; i++){
			matriz_predios[i] = [];
			for(j = 0; j < num_buildings; j++ ){
				if(pointer < buildings.length){
					matriz_predios[i][j] = buildings[pointer];
					pointer++;
				}
			}
		}

		return matriz_predios;
	}

	self.getWidth = function(){
		var buildings = matriz_buildings;
		var sum_width = 0;
		var line_width = 0;
		for( i = 0; i < self.num_buildings_per_line(); i++ ){
			
			line_width = 0;
		  
		  for( j = 0; j < self.num_buildings_per_line(); j++ ){
		  	if(buildings[i][j] !== undefined){
		  		line_width += buildings[i][j].side();
		  	}
		  }

		  if(line_width > sum_width) sum_width = line_width;
		}

		return sum_width;
	}


	self.getHeight = function(){
		var buildings = matriz_buildings;
		var sum_width = 0;
		var line_width = 0;
		for( i = 0; i < self.num_buildings_per_line(); i++ ){
			line_width = 0;
		  for( j = 0; j < self.num_buildings_per_line(); j++ ){
		  	if(buildings[j][i] !== undefined){
		  		line_width += buildings[j][i].side();
		  	}
		  }

		  if(line_width > sum_width) sum_width = line_width;
		}

		return sum_width;
	}

	self.getMatrizBuildings = function(){
		return matriz_buildings;
	}

	var init = function(){
		process();
	}

	return init();
}