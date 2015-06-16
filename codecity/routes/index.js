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
	var project_folders = __dirname + "/../public" + "/testes";

	// city = codecity.execute(city, project_folders + "jquery/src/ajax.js");
	// fs.readdir(, function(err, items) {
	//     console.log(items);

	//     for (var i=0; i<items.length; i++) {
	//         console.log(items[i]);
	//     }
	// });
	
	p = project_folders + "/jquery/src/";
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
	 	// console.log(city.getNeighbors());
  	res.render('index', { title: 'Express', city: city });
  });





});

module.exports = router;
