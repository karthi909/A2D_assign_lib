const userModel = require('../Model/userModel')
const Validator = require("../validation/validator")

const createUser = async (req, res)=>{
    try{
        let data = req.body

        let {name, email, phone, address} = data

        if(!name) return res.status(400).send({ status: false, message: "name is required or not valid" })
        if (!Validator.isValid(name)) return res.status(400).send({ status: false, message: "name is required or not valid" })

        if(!email) return res.status(400).send({ status: false, message: "email is required or not valid" })
        if (!Validator.isValid(email)) return res.status(400).send({ status: false, message: "email is required or not valid" })
        if (!Validator.isValidEmail(email)) return res.status(400).send({ status: false, message: "email is not valid" })

        if(!phone) return res.status(400).send({ status: false, message: "phone is required or not valid" })
        if (!Validator.isValidNumber(phone)) return res.status(400).send({ status: false, message: "phone number is not valid" })

        if(!address) return res.status(400).send({ status: false, message: "address is required or not valid" })
        if (!Validator.isValid(address)) return res.status(400).send({ status: false, message: "email is required or not valid" })
        if(!address.street) return res.status(400).send({ status: false, message: "street is required or not valid" })
        if (!Validator.isValid(address.street)) return res.status(400).send({ status: false, message: "street is required or not valid" })
        if(!address.city) return res.status(400).send({ status: false, message: "city is required or not valid" })
        if (!Validator.isValid(address.city)) return res.status(400).send({ status: false, message: "city is required or not valid" })
        if(!address.pincode) return res.status(400).send({ status: false, message: "pincode is required or not valid" })
        if (!Validator.isValid(address.pincode)) return res.status(400).send({ status: false, message: "pincode is required or not valid" })
        

        let userDts = await userModel.create(data)

        return res.status(201).send({status:true, msg:"succesful", Data: userDts})
    } catch(err){
        res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports.createUser = createUser;