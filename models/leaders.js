const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leadSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    designation: {
        type: String
    },
    abbr: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    featured: {
        type: String,
        default: false
    }
},
    {
        timestamps: true
});

const Leaders = mongoose.model('Leader', leadSchema);

module.exports = Leaders;