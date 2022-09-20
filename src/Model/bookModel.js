const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({

    title:{
        type:String,
        required: true,
        unique: true
    },
    authorName:{
        type:String,
        required: true
    },
    ISBN:{
        type: Number,
        required: true,
        unique: true
    },
    releasedAt:{
        type:String,
        required: true
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    bookPrice:{
        type:Number,
        required: true
    },
    issued:{
        type:Number,
        default: 0
    },
    isIssued:{
        type: Boolean,
        default: false
    }

},{timestamps: true})

module.exports = mongoose.model('book', bookSchema)