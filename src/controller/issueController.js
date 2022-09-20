const issueModel = require('../Model/issueModel')
const bookModel = require('../Model/bookModel')

const moment = require('moment')


const bookIssue = async (req, res) =>{
    try{
        let bookid = req.params.bookId
        let data = req.body
        let {bookId, issuedAt, userId} = data;

        data.issuedAt = moment().format('MMMM Do YYYY, h:mm:ss a')

        await bookModel.findOneAndUpdate({_id: bookId, isDeleted: false},{$inc:{issued: 1},isIssued: true })

        let resData = await issueModel.create(data)

        return res.status(201).send({status: true, msg:"Sucessful", data: resData})
        
    } catch(err){
        res.status(501).send({status: false, err: err.message})
    }
}

module.exports.bookIssue = bookIssue;