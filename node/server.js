var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var jwt = require('jwt-simple');

var mongo = require('mongodb');
var mongoose = require('mongoose');

var connect = function() {
    var options = { server: { socketOptions: { keepAlive: 1 }}};
    mongoose.connect('mongodb://localhost/test', options);
}
connect();

var db = mongoose.connection;

db.on('error', function(err) {
   console.log(err);
});

db.on('disconnected', function() {
    connect();
});

db.once('open', function callback() {
    var User = require('./models/user');
    var Item = require('./models/item');
    console.log('Connected to mongoose');

    User.findOne({ email: 'test@sexy.com'},function(err, user) {
        console.log(user);
    });
});

var app = express();

app.set('tokenSecret', '@tsaidota');
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var auth = require('./auth');
app.all('/api*', [auth]);

var api = require('./api');
app.use('/api/', api);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});

var debug = require('debug')('wustlmarketplace');
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
});

module.exports = app;
