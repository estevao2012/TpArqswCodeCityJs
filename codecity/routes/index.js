var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

	var codecity = require("../codecity-core/index.js");
	
	var city 		 = codecity.execute("/home/estevao/Workspace/UFMG/ARQSW/Tp/codecity/codecity-core/test.js");

  res.render('index', { title: 'Express', city: city });
});

module.exports = router;
