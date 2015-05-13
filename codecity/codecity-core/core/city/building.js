module.exports =  function Building(_type, _id, _params, _ast, _level){

	var moo = require('mootools');

	//Params
	var self  	 = this;
	var id 		   = _id;
	var params   = _params;
	var ast    	 = _ast;
	var type  	 = _type;
	self.level   = _level;
	
	//Atributes
	var num_var  = 0;
	var loc      = 0;
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
		return self.level;
	}

	self.getNumVar = function(){
		return num_var;
	}

	self.getLoc = function(){
		return loc;
	}

	var process = function(){
		metrics = counter(ast);
		// console.log(metrics);
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