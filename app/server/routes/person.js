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
        var account = "234590877676111";
        res.send({account: account});
    }   
    catch(e){
        next(e);
    }
}