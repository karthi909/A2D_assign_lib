const mongoose = require('mongoose')

const libSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type: Number,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    address:{
        street: {
            type: String
        },
        city: {
            type: String
        },
        pincode: {
            type: String
        }
    }
},{timestamps: true});

module.exports = mongoose.model('lib', libSchema)

