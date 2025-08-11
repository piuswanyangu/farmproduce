// import the express
const express=require('express')
// create the router
const router=express.Router();
// import the login controller
const loginControllers = require("../controllers/loginControllers");
// create the route to register an admin
router.post("/",loginControllers.registerAdmin)
router.post("/login", loginControllers.loginAdmin)

// export the module
module.exports=router;