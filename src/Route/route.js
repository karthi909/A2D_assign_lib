const express=require('express')
const router = express.Router()

const bookController = require('../controller/bookControler')
const userController = require('../controller/userController')
const libController = require('../controller/librController')
const issueController = require('../controller/issueController')

router.post('/createBook', bookController.createBook);
router.get('/getDetails/books', bookController.getDts);

router.post('/createuser', userController.createUser);

router.post('/libCreate', libController.createLib);

router.post('/issueBook', issueController.bookIssue)








module.exports= router;