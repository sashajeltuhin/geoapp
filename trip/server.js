var http = require('http');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var geo = require('./server/routes/geo');
var acp = require('./server/routes/acp');
// Get our API routes

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
app.use(express.static(path.join(__dirname, 'dist')));


const apiRoutes = express.Router();
// Set our api routes
apiRoutes.get('/testmap/:search', geo.testmap);
apiRoutes.get('/cashlimit', geo.getLimit);
apiRoutes.post('/hack', acp.hack);
apiRoutes.post('/lookup', geo.lookup);
apiRoutes.get('/labels', geo.getLabels); 
apiRoutes.post('/map',  geo.mapWay);
apiRoutes.post('/route',  geo.lookupRoutes);
app.use('/api', apiRoutes);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
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
var io = require('socket.io')(server);
server.listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});