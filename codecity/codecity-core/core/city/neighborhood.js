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

	self.getNumBuildings = function(){
		return buildings.length;
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

	self.num_lines_of_neighbor = function(){
		var builds      = matriz_buildings;
		var count_lines = 0;
		var success     = false;
		for( i = 0; i < self.num_buildings_per_line(); i++ ){
		  success = false;

		  for( j = 0; j < self.num_buildings_per_line(); j++ ){
		  	if(builds !== undefined && builds[i] !== undefined && builds[i][j] !== undefined){
		  		success = true;
		  	}
		  }

		  if(success) count_lines++;

		}

		return count_lines;
	}

	var listToMatrix = function(list, elementsPerSubArray) {
	    var matrix = [], i, k;

	    for (i = 0, k = -1; i < list.length; i++) {
	        if (i % elementsPerSubArray === 0) {
	            k++;
	            matrix[k] = [];
	        }

	        matrix[k].push(list[i]);
	        // console.log(matrix);
	    }

	    return matrix;
	}

	var position_buildings = function(){
		var num_buildings = self.num_buildings_per_line();
		return listToMatrix(buildings, num_buildings);
	}

	self.getWidth = function(){
		var builds  = matriz_buildings;
		var sum_width  = 0;
		var line_width = 0;

		for( i = 0; i < self.num_buildings_per_line(); i++ ){
			
			line_width = 0;
		  
		  for( j = 0; j < self.num_buildings_per_line(); j++ ){
		  	if(builds !== undefined && builds[i] !== undefined && builds[i][j] !== undefined ){
		  		line_width += builds[i][j].side();
		  	}
		  }

		  if(line_width > sum_width) sum_width = line_width;
		}

		return sum_width;
	}


	self.getHeight = function(){
		var builds = matriz_buildings;
		var sum_width = 0;
		var line_width = 0;

		for( i = 0; i < self.num_buildings_per_line(); i++ ){
			line_width = 0;
		  for( j = 0; j < self.num_buildings_per_line(); j++ ){
		  	if(builds !== undefined && builds[j] !== undefined && builds[j][i] !== undefined ){
		  		line_width += builds[j][i].side();
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