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
// router to get product by id
router.get("/:id",produceController.getProductById)
// router to update the product
router.put("/:id",produceController.updateProducts)
// router to delete the product
router.delete("/:id",produceController.deleteProduct)


// export the router
module.exports=router;