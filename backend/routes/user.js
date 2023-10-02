const express = require('express')

// Controller functions
const {SignupUser,LoginUser} = require('../controllers/userController')

const router = express.Router()


// login route
router.post('/login',LoginUser)

// signup route
router.post('/signup',SignupUser)



module.exports = router