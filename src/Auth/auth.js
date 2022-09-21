const jwt = require('jsonwebtoken')
const libModel = require('../Model/libModel')
//let tokens =[]
const Validator = require("../validation/validator")


const login = async (req, res) => {

   try {
        let data = req.body;
        let { email, password } = data;

        if(!email) return res.status(400).send({ status: false, message: "please provide Email" });
        if(!password) return res.status(400).send({status: false, msg:"please provide password "});

        let resData = await libModel.findOne({ email: email });

        if (!resData) return res.status(400).send({ masg: `No user found with this Email - ${email}` })

        if (resData.password !== password) {
            return res.status(400).send({ status: false, msg: "password is incorrect" })
        }

        let token = jwt.sign({ libId: resData._id }, "A2D", { expiresIn: '5h' });

        //tokens.push(token)
        //console.log(tokens)

        return res.status(201).send({status:"LogedIn successfully", token:token});

   } catch(err){
       res.status(500).send({status:"Error", msg: err.message})
   }

}




module.exports.login = login;