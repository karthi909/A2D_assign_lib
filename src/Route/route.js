const express=require('express')
const router = express.Router()

const bookController = require('../controller/bookControler')
const userController = require('../controller/userController')
const libController = require('../controller/librController')
const issueController = require('../controller/issueController')
const auth = require('../Auth/auth')
const autz = require('../Middleware/authorization')

router.post('/createBook',autz.autz, bookController.createBook);
router.get('/getDetails/books/:libId',autz.autz, bookController.getDts);
router.patch('/updateBook/:bookid',autz.autz, bookController.updateBook);
router.delete('/deleteBook/:bookid', bookController.deleteBooks)

router.post('/createuser', userController.createUser);

router.post('/libCreate', libController.createLib);

router.post('/issueBook',autz.autz, issueController.bookIssue)

router.post('/login', auth.login);







module.exports= router;