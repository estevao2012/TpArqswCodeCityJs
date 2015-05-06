module.exports = function Neighborhood(_filename, _code, _ast){
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

	var process = function(){
		ast['body'].forEach(function(elem){
			if(elem.type == "FunctionDeclaration"){
				buildings.push(new Building(elem.id.name, elem.params, elem.body));
			}else{
				rest_code.push(elem);
			}
		});
	}

	var init = function(){
		process();
	}

	return init();
}