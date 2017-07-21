//AppD insert

var appDobj = {
	 controllerHostName: process.env['APPD_URL'],
	 controllerPort: 443, 
	 controllerSslEnabled: true,
	 accountName: process.env['APPD_ACCOUNT'],
	 accountAccessKey: process.env['APPD_KEY'],
	 applicationName: process.env['APPD_APP_NAME'],
	 tierName: process.env['APPD_APP_TIER'],
	 nodeName: 'process'
}
require("appdynamics").profile(appDobj);

//End AppD insert
var http = require('http');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var geo = require('./server/routes/geo');
var acp = require('./server/routes/acp');
var person = require('./server/routes/person');
var knock = require('./server/routes/knock');
var passport = require('passport');

var app = express();

app.on('close', function () {

});


app.set('port', process.env.PORT || 8077);
app.set('jsonp callback', true );
//app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'trip/dist')));

app.use(passport.initialize());
require('./server/routes/auth')(passport);


const apiRoutes = express.Router();
// Set our api routes
apiRoutes.post('/login', knock.login);
apiRoutes.get('/testmap/:search', geo.testmap);
apiRoutes.get('/account', passport.authenticate('jwt', { session: false}), person.getAccount);
apiRoutes.get('/cashlimit', person.getLimit);
apiRoutes.post('/hack', acp.hack);
apiRoutes.post('/lookup', geo.lookup);
apiRoutes.post('/savePoi', geo.savePoi);
apiRoutes.post('/deletePoi', geo.deletePoi);
apiRoutes.get('/loadSearches', geo.loadSavedPois);  
apiRoutes.get('/labels', geo.getLabels);  
apiRoutes.post('/map',  geo.mapWay);
apiRoutes.post('/route',  geo.lookupRoutes);
app.use('/api', apiRoutes);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'trip/dist/index.html'));
});



app.use(function(err, req, res, next){
    console.log(err);
    res.status(500).send({ error: err });
});

app.on('close', function () {
  if ( global.db !== undefined){
    for(var key in  global.db){
      global.db[key].close();
    }
  }
});

var server = http.createServer(app);
server.listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});