var account = "234590877676111";
exports.getPerson = function(q, callback){
	if (q.email && q.email == "sasha@apprenda.com"){
		q.uname = "Sasha";
		callback(null, q);
	}
	else{
		callback("Invalid user");
	}
}

exports.getLimit = function(req, res, next){
    try{
        var limit = process.env['CASH_LIMIT'] || 500;
        res.send({limit:limit});
    }
    catch(e){
        next(e);
    }
}

exports.getAccount = function(req, res, next){
    try{
        res.send({account: account});
    }   
    catch(e){
        next(e);
    }
}

exports.getAccountData = function(req, res, next){
    try{
        var rq = require('request');
        var limit = process.env['CASH_LIMIT']
        var path = process.env['LEGACY_URL']
        path += "/" + account + "/" + limit;
        console.log("legacy", path);
        rq({
            method: 'GET',
            uri: path,
            strictSSL: false
            }, function (err, response, body) {
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