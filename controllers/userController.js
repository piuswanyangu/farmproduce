// import the user model
const {User}=require("../models/farmProduce");
// import the bcrypt for password hashing
const bcrypt = require('bcrypt')
// import the jwt to generate the token
const jwt = require('jsonwebtoken')

exports.registerUser = async(req,res)=>{
    try {
        // get the user data from reques dot body
        const{name,email,password,phone,role,county,subCounty,village}=req.body;
        // console.log(name,email,password,phone,role,county,subCounty,village)
        // check if the user exists
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({message:"User Already exists"})

        }
        // hash the password
        const hashedPassword = await bcrypt.hash(password,10);
        // create the user
        const newUser = new User({
            name,
            email,
            password:hashedPassword,
            phone,
            role,
            location:{
                county,
                subCounty,
                village,
            }

        })
        // save the user on db
        const user = newUser.save();
        // if the user  is saved successfully return the response
        res.status(201).json({
            message:"User registered successfully",
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                phone:user.phone,
                role:user.role,
                location:user.location,
            }
        })
        
    } catch (error) {
        rs.status(403).json({message:"Failed to register user",error:error.message})
    }
}

// ========================
// getting all users
exports.getAllUsers = async (req,res) => {
    try {
        // find all parents using find method
        const users = await User.find()
        res.json(users)
        
    } catch (error) {
        // catch any error that may occur during the process of fetching all the users
        res.status(500).json({message:"Error fetching users",error:error.message})
    }
}

// ===================================
// getting users by Id
exports.getUsersById = async(req,res)=>{
    try{
        const user = await User.findOne({ email:req.params.id})
        if(!user){
            return res.status(404).json({message:"User Not Found"})
        }
        // if successful just project the details of the user
        res.status(200).json(user)

    }catch(error){
        // catch any error that could arise from  getting user by id
        res.status(500).json({message:"Error fetching user",error:error.message})
    }
// ================================================
// updating the user
exports.updateUsers = async (req,res) => {
    try {
        
    } catch (error) {
        
    }
}


}
