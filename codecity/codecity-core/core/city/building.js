module.exports =  function Building(_name, _params, _object){
	
	var self  	= this;
	var name 	  = _name;
	var params  = _params;
	var object  = _object;
	var num_var  = 0;
	var num_func = 0
	var loc      = 0;

	self.getSignature = function(){
		return name.name;
	}

	self.getParams = function(){
		return params;
	}

	self.getObject = function(){
		return object;
	}

	self.getNumVar = function(){
		return num_var;
	}

	self.getLoc = function(){
		return loc;
	}

	self.getNumFunc = function(){
		return num_func;
	}

	var process = function(){
		console.log(name);
		object.forEach(function(obj, index){
			console.log(obj);	
			switch(obj.type) {
		    case 'VariableDeclaration':
						num_var++;
		        break;
		    case 'FunctionDeclaration':
		        num_func++;
		        break;
		    default:
		        break;
			}
		});
	}

	var init = function(){
		process();
	}

	return init();
}