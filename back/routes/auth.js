const router = require('express').Router()
const userCtrl = require ('../controllers/user')
const verify = require('../middleware/verifyToken')

//Signup
router.post('/signup', userCtrl.signUp)

//Login 
router.post('/login', userCtrl.login)

//Admin
router.get('/:id', verify, userCtrl.getUser)


module.exports = router