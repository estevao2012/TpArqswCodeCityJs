module.exports =  function Building(_type, _id, _params, _ast, _level, _loc){

	var moo = require('mootools');

	//Params
	var self  	 = this;
	var id 		   = _id;
	var params   = _params;
	var type  	 = _type;
	var ast      = _ast;
	var level   = _level;
	
	//Atributes
	var num_var  = 0;
	var loc      = _loc;
	var metrics  = {
		"VariableDeclaration" : 0,
		"VariableDeclarator" : 0,
	};

	self.getSignature = function(){
		if(id) return id.name;
		return "Sem nome";
	}

	self.getParams = function(){
		return params;
	}

	self.getObject = function(){
		return ast;
	}

	self.getLevel = function(){
		return level;
	}

	self.getFunctionsDeclared = function(){
		return metrics["FunctionExpression"] + metrics["FunctionDeclaration"];
	}

	self.getNumVar = function(){
		if(metrics["VariableDeclarator"] !== undefined)
			return metrics["VariableDeclarator"];
		else
			return 1;
	}

	self.getLoc = function(){
		return loc;
	}

	var process = function(){
		metrics = counter(ast);
	}

	self.side = function(){
		return self.getNumVar();
	}

	self.height = function(){
		return self.getLoc();
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
				}

				Object.each(val, function(e) {
					Object.each(counter(e), function(ev, i) {
						if(typeof(r[i])=='undefined') {
							r[i] = 0;
						}

						r[i] += ev;

					});
				});
				

			break;
			case 'array':
				val.each(function (e) {
					Object.each(counter(e), function(ev, i) {
						if(typeof(r[i])=='undefined') {
							r[i] = 0;
						}
						r[i] += ev;
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