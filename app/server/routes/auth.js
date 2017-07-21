var pwt = require('passport-jwt');
var JwtStrategy = pwt.Strategy;
var ExtractJwt = pwt.ExtractJwt;
var config =  require('./config.js');
var person = require('./person');


module.exports = function(passport) {
  var opts = {};
  opts.secretOrKey = config.jwt.jwtSecret;
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    console.log("check in JWT Strategy", jwt_payload);
    var q = {};
    q.email = jwt_payload.email;
    person.getPerson(q, function(err, p){
          if (err){
              done(err);
          }
          else if (p){
              done(null, p);
            
          } else {
              done("User not found");
          }
    });
  }));
};