var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/:image?*', function(req, res) {

 var downloadimage = require('../app/downloadimage');
 var image = "h"+req.params[0];
 // SM - why is it missing the h? 
downloadimage.saveImage(image,function(success){
	console.log("done but too early");
 	res.writeHead(200, {"Content-Type": "application/json"});
 
	  var json = JSON.stringify({ 
	    response:success
	  });
	  res.end(json);
 });
 

});

module.exports = router;
