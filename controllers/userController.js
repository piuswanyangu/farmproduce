// import the user model
const {User}=require("../models/farmProduce");
// import the bcrypt for password hashing
const bcrypt = require('bcrypt')
// import the jwt to generate the token
const jwt = require('jsonwebtoken')

exports.registerUser = async(req,res)=>{
    try {
        // console.log("The request body is",req.body)
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
        // console.log(hashedPassword)
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
        const user = await newUser.save();
        // console.log(user)
        // if the user  is saved successfully return the response
        return res.status(201).json({
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
        res.status(403).json({message:"Failed to register user",error:error.message})
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
        // fetch the users id (the person logged in)
        // const userId = req.user.user._id;
        const user = await User.findById(req.params.id)
        if(!user){
            return res.status(404).json({message:"User Not Found"})
        }
        // if successful just project the details of the user
        res.status(200).json(user)

    }catch(error){
        // catch any error that could arise from  getting user by id
        res.status(500).json({message:"Error fetching user",error:error.message})
    }


}

// ================================================
// updating the user

exports.updateUsers = async (req,res) => {
    try {
        // we shall find user by id then update
        const updatedUser = await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
        // if the passed in id is not found return
        if(!updatedUser){
            return res.status(404).json({message:"User Not Found"})
        }
        // if the user is found proceed to the next step
        res.json(updatedUser)
        
    } catch (error) {
        // catch any error that may occur during updating themuser
        res.status(500).json({message:"Error Updating the user", error:error.message})
        
    }
}

// ======================================================
// deleting the user based on id
exports.deleteUser =  async (req,res) => {
    try {
        // we shall use find by id and delete method to delete the user
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        // check whether the user does not exists
        if(!deletedUser){
            return res.status(404).json({message:"User Not found"})
        }
        
        // if successfull
        await User.findOneAndDelete(req.params.id);
       return res.status(200).json({message:"User Deleted Successfully"})
        
    } catch (error) {
        // catch any error that it may occur during the process of registration
        res.status(500).json({message:"Failed to delete user",error:error.message})
    }
}
