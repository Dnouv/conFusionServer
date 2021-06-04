var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var passportLocMongoose = require('passport-local-mongoose')

var User = new Schema({
    admin: {
        type: Boolean,
        default: false
    }
})

User.plugin(passportLocMongoose)

module.exports = mongoose.model('User', User)