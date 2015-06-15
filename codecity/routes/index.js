var express = require('express');
var router = express.Router();
var path = require('path');
var app = express();
var City = require("../codecity-core/core/city/city.js");
var codecity    = require("../codecity-core/index.js");	

/* GET home page. */
router.get('/', function(req, res, next) {	
	var city = new City();
	var project_folders = __dirname + "/../public" + "/testes/";

	// city = codecity.execute(city, project_folders + "jquery/src/ajax.js");

	var walk    = require('walk');
	var files   = [];

	// Walker options
	var walker  = walk.walk( project_folders + "jquery/src", { followLinks: false });

	walker.on('file', function(root, stat, next) {
	    files.push(root + '/' + stat.name);
	    next();
	});

	walker.on('end', function() {
	  files.forEach(function(el, index) {
	  	try{
				city = codecity.execute(city, el);
	  	}catch(e){
	  		console.log(e);
	  	}
	  });
	});

	console.log(city);


  res.render('index', { title: 'Express', city: city });
});

module.exports = router;
