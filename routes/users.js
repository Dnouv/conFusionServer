const express = require('express');
const userRouter = express.Router();

const User = require('../models/user')

userRouter.use(express.json)
userRouter.use(express.urlencoded({
  extended: true
}))

/* GET users listing. */
userRouter.get('/', function(req, res, next) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end("Get working properly")
});

userRouter.post('/signup', (req, res, next) => {
  User.findOne({username: req.body.username})
  .then((user) => {
    if (user != null) {
      var err = new Error('The user with username '+req.body.username+' already exists!')
      err.status = 403;
      next(err)
    }
    else {
      return User.create({
        username: req.body.username,
        password: req.body.password
      })
    }
  })
  .then((user) => {
    res.statusCode = 200,
    res.setHeader('Content-Type', 'application/json')
    res.json({status: 'Registration Successful', user: user})
  }, (err) => next(err))
  .catch((err) => next(err))
})

userRouter.post('/login', (req, res, next) => {
  if(!req.session.user) {
    var authHeader = req.headers.authorization
    if(!authHeader) {
      var err = new Error('You are not authenticated!')
      res.setHeader('WWW-Authenticate', 'Basic')
      err.status = 401;
      return next(err)
    }
  
    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':')
    var username = auth[0]
    var password = auth[1]

    User.findOne({username: username})
    .then((user) => {
      if (user === null) {
        var err = new Error("Woh, looks like, there is not any user with username "+ username)
        err.status = 403;
        return next(err)
      }
      else if (user.password !== password) {
        var err = new Error(`Hold on ${username}, looks like, you forgot the wrong password`)
        err.status = 403;
        return next(err)
      }
      else if(username === user.username && password === user.password) {
        req.session.user = 'authenticated'
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/plain')
        res.end('You are authenticated!')
      }
    })
    .catch((err) => next(err))
  }

  else {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end('You are already authenticated')
  }
})

userRouter.get('/logout', (req, res) => {
  if(req.session) {
    req.session.destroy()
    res.clearCookie('session-id')
    res.redirect('/')
  }
  else {
    var err = new Error('Looks, like you are not logged in!')
    err.status = 403
    next(err)
  }
})

module.exports = userRouter;
