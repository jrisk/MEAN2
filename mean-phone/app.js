var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongojs = require('mongojs');

//database setup
var db = mongojs('contactlist', ['contactlist']);

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use(favicon(__dirname + 'public/images.favicon.ico'));

app.use('/', routes);
app.use('/users', users);

//GET request router
app.get('/contactlist', function (req, res) {
	console.log("a GET request has been made from the controller");
	
	db.contactlist.find(function (err, docs) {
		console.log(docs);
		res.json(docs);
		});
	});
	
//POST request router
app.post('/contactlist', function(req, res) {
	console.log("a POST request has been made from the view to the controller to the database to store");
	console.log(req.body);
	
	db.contactlist.insert(req.body, function (err, doc) {
		console.log("document inserted into mongodb, now sending doc back to controller");
		res.json(doc);
		});
	});
	
//DELETE request router
app.delete('/contactlist/:id', function (req, res) {
	var id = req.params.id;
	console.log(id);
	db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
	res.json(doc);
	});
	});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app