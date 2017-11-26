var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var { graphiqlExpress, graphqlExpress } = require('graphql-server-express');

var index = require('./routes/index');
var users = require('./routes/users');
var graphqlSchema = require('./graphql');

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/webapp';

MongoClient.connect(url, function(err, db){

	if(err){
		console.log(err);
	}

	assert.equal(null, err);
	console.log('connected to database');

	db.close();
})


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', index);
//app.use('/users', users);
app.use('/graphiql', graphiqlExpress({
  endpointURL:'/graphql',
}));

app.use(
  '/graphql', 
  bodyParser.json(), 
  graphqlExpress({ 
    schema: graphqlSchema,
  }));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
