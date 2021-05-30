const express = require('express')
const dishRouter = express.Router()

const mongoose = require('mongoose')
const Dishes = require('../models/dishes')

dishRouter.use(express.json())
dishRouter.use(express.urlencoded({
    extended: true
}))

dishRouter.route('/')
.get((req, res, next) => {
    Dishes.find({})
    .then((dishes) => {
        res.statusCode = 200,
        res.setHeader('Content-Type', 'application/json')
        res.json(dishes)
    }, (err) => next(err))
    .catch((err) => next(err))
})

.post((req, res, next) => {
    Dishes.create(req.body)
    .then((dish) => {
        console.log("Created the dish", dish)
        res.statusCode = 200,
        res.setHeader('Content-Type', 'application/json')
        res.json(dish)
    }, (err) => next(err))
    .catch((err) => next(err))
})

.put((req, res, next) => {
    res.statusCode = 403
    res.end("Oopsie, looks like PUT operation is not supported on /dishes")
})

.delete((req, res, next) => {
    Dishes.remove({})
    .then((resp) => {
        res.statusCode = 200,
        res.setHeader('Content-Type', 'application/json')
        res.json(resp)
    }, (err) => next(err))
    .catch((err) => next(err))
})

dishRouter.route('/:dishId')
.get((req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then((dishes) => {
        res.statusCode = 200,
        res.setHeader('Content-Type', 'application/json')
        res.json(dishes)
    }, (err) => next(err))
    .catch((err) => next(err))
})

.post((req, res, next) => {
    res.statusCode = 403
    res.end("Oopsie, looks like POST operation is not supported on /dishes")})

.put((req, res, next) => {
    Dishes.findByIdAndUpdate(req.params.dishId, {
        $set: req.body
    }, {new : true})
    .then((dishes) => {
        res.statusCode = 200,
        res.setHeader('Content-Type', 'application/json')
        res.json(dishes)
    }, (err) => next(err))
    .catch((err) => next(err))
})

.delete((req, res, next) => {
    Dishes.findByIdAndRemove(req.params.dishId)
    .then((resp) => {
        res.statusCode = 200,
        res.setHeader('Content-Type', 'application/json')
        res.json(resp)
    }, (err) => next(err))
    .catch((err) => next(err))
})

module.exports = dishRouter;
