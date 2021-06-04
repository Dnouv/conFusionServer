var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var fileStore = require('session-file-store')(session)

const mongoose = require('mongoose')

const url = "mongodb://localhost:27017/conFusion"
const connect = mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
const { db } = require('./models/dishes');

connect.then((db) => {
  console.log("Connect correctly  to the server")
}, (err) => {console.log(err)})

var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leaderRouter')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser('12345-67890'));
app.use('/', indexRouter);
app.use('/users', userRouter);

app.use(session({
  name: 'session-id',
  secret: '12345-67890',
  saveUninitialized: false,
  resave: false,
  store: new fileStore()
}))


const auth = (req, res, next) => {
  console.log(req.session)
  if(!req.session.user) {
    var err = new Error('You are not authenticated!')
    err.status = 403;
    return next(err)
  }

  else {
    if(req.session.user === 'authenticated') {
      next()
    }
    else{
      var err = new Error('You are not authenticated!')
      err.status = 403;
      return next(err)
    }
  }
  
}

app.use(auth)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);



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
});

module.exports = app;
