const mongoose = require('mongoose')


const vacancySchema = new mongoose.Schema({
    title: String,
    date : {
        type: Date,
        default : Date.now
    },
    email: {
        header: String,
        body: String
    },
})

module.exports = mongoose.model('Email', vacancySchema);