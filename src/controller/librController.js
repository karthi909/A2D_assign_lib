const libModel = require('../Model/libModel')

const createLib = async (req, res)=>{
try{
        let data = req.body;
        let {name, email, phone, password, address} = data;

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