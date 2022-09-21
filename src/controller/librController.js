const libModel = require('../Model/libModel')
const Validator = require("../validation/validator")

const createLib = async (req, res)=>{
try{
        let data = req.body;
        let {name, email, phone, password, address} = data;

        if(!name) return res.status(400).send({ status: false, message: "name is required or not valid" })
        if (!Validator.isValid(name)) return res.status(400).send({ status: false, message: "name is required or not valid" })

        if(!email) return res.status(400).send({ status: false, message: "email is required or not valid" })
        if (!Validator.isValid(email)) return res.status(400).send({ status: false, message: "email is required or not valid" })
        if (!Validator.isValidEmail(email)) return res.status(400).send({ status: false, message: "email is not valid" })

        if(!phone) return res.status(400).send({ status: false, message: "phone is required or not valid" })
        if (!Validator.isValidNumber(phone)) return res.status(406).send({ status: false, message: "phone number is not valid" })

        if(!password) return res.status(400).send({ status: false, message: "phone is required or not valid" })
        if(password.length < 6) return res.status(406).send({msg:"must be length grater than 6"})

        if(!address) return res.status(400).send({ status: false, message: "address is required or not valid" })
        if (!Validator.isValid(address)) return res.status(400).send({ status: false, message: "email is required or not valid" })
        if(!address.street) return res.status(400).send({ status: false, message: "street is required or not valid" })
        if (!Validator.isValid(address.street)) return res.status(400).send({ status: false, message: "street is required or not valid" })
        if(!address.city) return res.status(400).send({ status: false, message: "city is required or not valid" })
        if (!Validator.isValid(address.city)) return res.status(400).send({ status: false, message: "city is required or not valid" })
        if(!address.pincode) return res.status(400).send({ status: false, message: "pincode is required or not valid" })
        if (!Validator.isValid(address.pincode)) return res.status(400).send({ status: false, message: "pincode is required or not valid" })

        let libData = await libModel.create(data)
        
        return res.status(201).send({
            status: true,
            msg: 'succesfull',
            Data: libData
        });


    } catch (err){
        res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports.createLib = createLib;