var express = require('express');
var partials = require('express-partials');
var util = require('./lib/utility');
var mongoose = require('mongoose');
var env = process.env.NODE_ENV || 'development';

var handler = require('./lib/request-handler');

var app = express();

// Connect to datatbase
if (env === 'production') {
  mongoose.connect('mongodb://<user>:<password>@ds061415.mongolab.com:61415/heroku_402lncjz');
} else {
  mongoose.connect('mongodb://mongodb://127.0.0.1:27017/test');
}
  
app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(partials());
    app.use(express.bodyParser());
    app.use(express.static(__dirname + '/public'));
    app.use(express.cookieParser('shhhh, very secret'));
    app.use(express.session());
});

app.get('/', util.checkUser, handler.renderIndex);
app.get('/create', util.checkUser, handler.renderIndex);

app.get('/links', util.checkUser, handler.fetchLinks);
app.post('/links', handler.saveLink);

app.get('/login', handler.loginUserForm);
app.post('/login', handler.loginUser);
app.get('/logout', handler.logoutUser);

app.get('/signup', handler.signupUserForm);
app.post('/signup', handler.signupUser);

app.get('/*', handler.navToLink);

module.exports = app;
