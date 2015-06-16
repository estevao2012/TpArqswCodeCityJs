var express = require('express');
var router = express.Router();
var path = require('path');
var app = express();
var fs 			= require('fs');
var City = require("../codecity-core/core/city/city.js");
var codecity    = require("../codecity-core/index.js");	

/* GET home page. */
router.get('/', function(req, res, next) {

	var city = new City();
	var project_folders = __dirname + "/../public/testes";
	
	//Jquery
	p = project_folders + "/reveal.js/js";



	var fs = require('fs');

	var walk = function(dir, done) {
	  var results = [];
	  fs.readdir(dir, function(err, list) {
	    
	    if (err) return done(err);
	    var i = 0;
	    
	    (function next() {
	      var file = list[i++];
	      if (!file) return done(null, results);
	      
	      file = dir + '/' + file;

	      fs.stat(file, function(err, stat) {
	        if (stat && stat.isDirectory()) {
	          walk(file, function(err, res) {
	            results = results.concat(res);
	            next();
	          });
	        } else {
	        	if(file.indexOf(".js") > 0){
		          results.push(file);
		          next();
	        	}
	        }
	      });
	    })();

	  });
	}

  walk(p, function(err, files) {
    if (err) throw err;
	  files.forEach(function(el, index) {
	  	try{
				neigh = codecity.execute(el);
				city.addNeighborhood(neigh);
	  	}catch(e){
	  		console.log(e);
	  	}
	  });
  	res.render('index', { title: 'Express', city: city });
  });
});

module.exports = router;
