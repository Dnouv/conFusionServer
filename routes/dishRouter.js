const express = require('express')
const dishRouter = express.Router()

dishRouter.use(express.json())
dishRouter.use(express.urlencoded({
    extended: true
}))

dishRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    next()
})

.get((req, res, next) => {
    res.end('<html><body><h1>Will send all the dishes to you</h1></body></html>')
})

.post((req, res, next) => {
    res.end("Will add the dish "+req.body.name+" with the details "+req.body.description)
})

.put((req, res, next) => {
    res.statusCode = 403
    res.end("Oopsie, looks like PUT operation is not supported on /dishes")
})

.delete((req, res, next) => {
    res.end("Looks like the dishes were not yummy enough...Deleting all the dishes")
})

dishRouter.route('/:dishId')
.get((req, res, next) => {
    res.end("Will send the details of the dish which one? Gotcha correct this one "+
            req.params.dishId)
})

.post((req, res, next) => {
    res.statusCode = 403
    res.end("Oopsie, looks like POST operation is not supported on /dishes")})

.put((req, res, next) => {
    res.write(`Thanks for updating the dish details, hang on a sec while updating changes for ${req.params.dishId}...`)
    res.end(`Updating the dish ${req.body.name} with details changes as : \n ${req.body.description}`)
})

.delete((req, res, next) => {
    res.end("Looks like the dish was not yummy enough...Deleting the dish" + req.body.dishId)
})

module.exports = dishRouter;
