var path = require('path');
var logger = require('morgan');
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var express = require('express');
var mongoose = require('mongoose');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
require('./routes/users')(io);
var Posts = require('./model/posts');

try {
	mongoose
		.connect('mongodb://rajthakar:2o13o1419@ds245022.mlab.com:45022/mern',{ useNewUrlParser: true })
		.then((data) => {
			console.log('connected to', data.connection.name);


      http.listen(3000, function(){
        console.log('listening on *:3000');
      });

      app.use(logger('dev'));
      app.use(express.json());
      app.use(express.urlencoded({ extended: false }));
      app.use(cookieParser());
      app.set('views', path.join(__dirname, 'views'));
      app.set('view engine', 'jade');
      app.use(express.static(path.join(__dirname, 'public')));

      app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error =  err;

        // render the error page
        res.status(err.status || 500);
        res.render('error');
      });

		});
} catch (err) {
	console.error('Error connecting DB', err);
}
