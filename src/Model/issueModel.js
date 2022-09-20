const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId

const issueSchema = new mongoose.Schema({

    bookId:{
        type: ObjectId,
        ref:'book',
        required: true
    },
    issuedAt:{
        type: String
    },
    userId:{
        type: ObjectId,
        ref: 'user',
        required: true
    }

},{timestamps: true})

module.exports = mongoose.model('issue', issueSchema)