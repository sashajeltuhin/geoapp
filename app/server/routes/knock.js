var jwt = require("jwt-simple");  
var cfg = require("./config");  
var person = require('./person');

exports.login = function(req, res, next){
	
    try{
        console.log("login called", req.body);
        if (req.body.email && req.body.password) {
            var user = req.body;
            var q = {};
            q.email = user.email;
            q.pass = user.password;
            person.getPerson(q, function(err, p){
                if (err){
                    next(err);
                }
                else if (p){
                    try{
                        console.log("Passwords:", user.password, p.pass);
                        var encoded = encodePass(user.password);
                        if (encoded === encodePass(p.pass)) {
                            var token = genToken(p);
                            var personSend = {};
                            personSend.uname = p.uname;
                            personSend.email = p.email;
                            res.json({
                                token: token,
                                person: personSend
                            });
                        } else {
                            console.log("Passwords do not match");
                            res.sendStatus(401);
                        }
                    }
                    catch(ex){
                        next(ex);
                    }
                }
                else{
                    console.log("user not found", user.email);
                    next("Traveler not found");
                }
            });
            
        } else {
            res.sendStatus(401);
        }
    }
    catch (e){
        next(e);
    }
}

exports.GetToken = function(p){
    return GetToken(p);
}

function genToken(p){
    if (!p){
        throw "Cannot generate token for ghosts. No person provided";
    }
    var payload = {
        email: p.email
    };
    if (p.sso){
        payload.sso = p.sso;
    }
    var token = "JWT "+ jwt.encode(payload, cfg.jwt.jwtSecret);
    console.log("token", token);
    return token;
}


function encodePass(pass){
    return jwt.encode(pass, cfg.jwt.jwtSecret);
}

// function regUser(pObj, callback){
//     console.log("registering or updating user", pObj);
//     if (pObj.pass){
//         pObj.pass = encodePass(pObj.pass);
//     }
//     person.createPerson(pObj, function(err, p){
//         if (err){
//             callback(err);
//         }
//         else{
//             callback(null, p);
//         }
//     });
// }


// exports.regUser = function (pObj, callback){
//     regUser(pObj, callback);
// }

// exports.register = function(req, res, next){
    
//     try{
//         var pObj = req.body;
//         console.log("register called", pObj);
//         regUser(pObj, function(err, p){
//             if (err){
//                 next(err);
//             }
//             else{
//                 res.send(p);
//             }
//         })
//     }
//     catch(e){
//         next(e);
//     }
// }
