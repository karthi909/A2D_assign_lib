const issueModel = require('../Model/issueModel')
const bookModel = require('../Model/bookModel')
const Validator = require("../validation/validator")


const moment = require('moment')


const bookIssue = async (req, res) =>{
    try{
        let data = req.body
        let {bookId, issuedAt, userId} = data;
        if(!bookId) return res.status(400).send({msg:"Please provide bookId"})
        if (!Validator.isValid(bookId)) return res.status(400).send({ status: false, msg: "please provide valid bookId." });
        if (!Validator.isValidObjectId(bookId)) return res.status(400).send({ status: false, message: "bookId  is not valid" });
     
        if(!userId) return res.status(400).sned({msg:"Please provide userId"})
        if (!Validator.isValid(userId)) return res.status(400).send({ status: false, msg: "please provide valid userId." });
        if (!Validator.isValidObjectId(userId)) return res.status(400).send({ status: false, message: "userId  is not valid" });
        

        data.issuedAt = moment().format('MMMM Do YYYY, h:mm:ss a')

        await bookModel.findOneAndUpdate({_id: bookId, isDeleted: false},{$inc:{issued: 1},isIssued: true })

        let resData = await issueModel.create(data)

        return res.status(201).send({status: true, msg:"Sucessful", data: resData})
        
    } catch(err){
        res.status(501).send({status: false, err: err.message})
    }
}

module.exports.bookIssue = bookIssue;