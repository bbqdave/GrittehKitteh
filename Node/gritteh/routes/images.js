var express = require('express');
var router = express.Router();
var http = require('https');


router.get('/:next?*', function(req,res){
	var request = require("request");
	
	console.log('shit stacey'+req.params[0]);
	
	var geturl =  (req.params[0].length>1)? "h"+req.params[0]:'https://api.instagram.com/v1/tags/kitteh/media/recent?client_id=c70faab2ef50451c9e49ab48a4199ef3';
	
	request({
    	url:geturl,
    	json: true
	}, function (error, response, body) {
    	if (!error && response.statusCode === 200) {
    		res.writeHead(200, {"Content-Type": "application/json"});
        	res.end(JSON.stringify(body));
    	}
	})
})



module.exports = router;
