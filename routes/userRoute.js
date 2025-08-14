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

// route for fetching all users
router.get("/",userController.getAllUsers)

// router to fetch user by Id
router.get("/:id",userController.getUsersById)
// below is the router to update the user
router.put("/:id", userController.updateUsers)




module.exports=router;