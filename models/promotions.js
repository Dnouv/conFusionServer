const mongoose = require('mongoose')
const Schema = mongoose.Schema
require('mongoose-currency').loadType(mongoose)
const Currency = mongoose.Types.Currency

const promoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    label: {
        type: String,
        default: ''
    },
    price: {
        type: Currency
    },
    description: {
        type: String,
        required: true
    },
    featured: {
        type: String,
        default: false
    }
}, {
    timestamps: true
})

const Promotions = mongoose.model('Promotion', promoSchema)
module.exports = Promotions