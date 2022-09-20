const userModel = require('../Model/userModel')

const createUser = async (req, res)=>{
    try{
        let data = req.body

        let {name, email, phone, address} = data

        let userDts = await userModel.create(data)

        return res.status(201).send({status:true, msg:"succesful", Data: userDts})
    } catch(err){
        res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports.createUser = createUser;