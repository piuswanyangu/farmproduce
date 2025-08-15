// import the express
const express = require('express')
// create the router
const router= express.Router()
// import the produce controller
const produceController = require('../controllers/produceController')
// import the auth function
const auth = require("../middlewares/auth")
// router to add products
router.post("/",produceController.addProduct)

// router to get all products
router.get("/",produceController.getAllProduct)



// export the router
module.exports=router;