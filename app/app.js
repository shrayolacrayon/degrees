
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

var mongoose= require('mongoose');
var mongoStore= require('connect-mongodb');

app.configure(function(){
  app.set('port', process.env.PORT || 4000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
  app.set('db-uri', 'mongodb:localhost/degrees-development');
});

// Converts a database connection URI string to 
// the format connect-mongodb expects
function mongoStoreConnectionArgs() {
    return { dbname: db.db.databaseName,
        host: db.db.serverConfig.host,
        port: db.db.serverConfig.port,
        username: db.uri.username,
        password: db.uri.password };
}

var db= mongoose.connect(app.set('db-uri'));

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
