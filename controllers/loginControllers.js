// import the user schema
const {User} = require('../models/farmProduce');
// import the bcrypt to hash the password
const bcrypt=require('bcrypt');
// import the jwt
const jwt=require("jsonwebtoken");
// import the secret key from the dotenv
const JWT_SECRET = process.env.JWT_SECRET;

// below is the controller to register an admin
exports.registerAdmin = async (req,res) => {
    // pick the details from the insomnia
    const{name,email,password,secretKey}=req.body;
    // console.log("The details of admin are",name,email,password,secretKey);
    // verify the admin secret key
    if(secretKey !==process.env.ADMIN_SECRET){
        return res.status(403).json({message:"Unathorized account creation"})
    }

    // check whether the user already exist
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({message:"User with the Email already exist"})
        
    }
    // create the admin user
    // hash the password first
    const hashedPassword = await bcrypt.hash(password,10);

    // proceed
    const newUser = new User({
        name,
        email,
        password:hashedPassword,
        role:"admin",

    })
    // create the user
    const user = await newUser.save();
    // if registration is successfull return the user then
    res.status(201).json({message:"Admin created successfully"})
}