var rq = require('request');
exports.hack = function(req, res, next){
	try{
		var obj = req.body;
		var path = obj.path;
		console.log("hack", path);
		rq({
            method: 'GET',
            uri: path,
            strictSSL: false
            }, function (err, response, body) {
            	console.log ("hack response");
                if (!err) {
                	res.send(body);
                }
                else{
                	try {
					    var parsed = JSON.stringify(err);
					    next(parsed);
					} catch (ep) {
					    next(err);
					}
                	
                }
            });
	}
	catch (e){
		next(e);
	}
	
}

exports.hackPing = function(req, res, next){
	
}