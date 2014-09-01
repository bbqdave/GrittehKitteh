var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
	/*
	var Dropbox = require("dropbox");
		var client = new Dropbox.Client({
   			key: "84n8zb00nyityxp",
   			secret: "hg9omyp4n22cgz1"
		});

	client.authDriver(new Dropbox.AuthDriver.NodeServer(3000));


	client.authenticate(function(error, client) {
  	if (error) {
    	console.log("error");
    }

  
});*/
	
   
	res.render('index', { title: 'Express' });
});

module.exports = router;
