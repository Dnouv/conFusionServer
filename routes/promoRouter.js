const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(express.json())
promoRouter.use(express.urlencoded({
    extended: true
}))

promoRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next()
})

.get((req,res,next) => {
    res.end('Will send all the promotions to you!');
})

.post((req,res,next) => {
    res.end('Will add the promo: ' + req.body.name + 'wth details: ' + req.body.description);
})

.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
   
.delete((req, res, next) => {
    res.end('Deleting all promotions');
});

promoRouter.route('/:promoId')
.get((req,res,next) => {
    res.end('Will send the details of the promo: ' + req.params.promoId);
})

.post((req,res,next) => {
    res.statusCode = 403;
    res.end('Post operation not supported on /promotions/' + req.params.promoId)
})

.put((req, res, next) => {
    res.write('Updating the promo: ' + req.params.promoId + '\n');
    res.end('Will update the promo: ' + req.body.name + 
          ' with details: ' + req.body.description);
})

.delete((req, res, next) => {
    res.end('Deleting promo: ' + req.params.promoId);
});

module.exports = promoRouter;