var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var createDummyData = require('./routes/createDummyData');

// Connetion to local MongoDB
var monk = require('monk');
var db = monk('localhost:27017/DeepCode-Vuln-LogViewer');

//Provoke object literal error
const stateTypes = {
  stateOne : {
    stateOne : 'stateOne',
    payload : 42
  },
  stateTwo : {
    stateTwo : 'stateTwo',
    paylod : 14
  }
};

const currentState = stateTypes.stateOne;

if(currentState === stateTypes.stateOne) { console.log("State 1"); } 
if(currentState === stateTypes.stateTwo) { console.log("State 2"); } 


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Make our db accessible to our router
app.use(function(req,res,next){
  req.db = db;
  next();
});

app.use('/', indexRouter);
app.use('/createDummyData', createDummyData);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  
  next();
});

module.exports = app;
