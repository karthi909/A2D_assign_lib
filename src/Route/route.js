const express=require('express')
const router = express.Router()

const bookController = require('../controller/bookControler')
const userController = require('../controller/userController')

router.post('/createBook', bookController.createBook);
router.get('/getDetails/books', bookController.getDts);

router.post('/createuser', userController.createUser);






module.exports= router;