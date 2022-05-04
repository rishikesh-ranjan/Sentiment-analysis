const mongoose = require('mongoose')

const data = new mongoose.Schema({
    text: String,
    result: String,
    satisfaction: Boolean,
    desiredResult: String
})

module.exports = mongoose.model('data',data)