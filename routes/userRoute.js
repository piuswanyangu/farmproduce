// import the express
const express = require('express')
// create the router
const router = express.Router()

// import the user controller
const userController = require("../controllers/userController");
// import the auth middleware
const auth = require('../middlewares/auth');
// below is the router to register the user
router.post('/',userController.registerUser)




module.exports=router;