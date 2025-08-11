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
    if(secretKey !==process.env.ADMIN_SECRET_KEY){
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
    res.status(201).json({message:"Admin created successfully",user})
}

// login admin
exports.loginAdmin = async (req,res) => {
    try {
        // destructure the email and password from the req.body
        const {email,password}=req.body
        // console.log(email,password)

        // check if the email exists
        const user = await User.findOne({ email })
        // check if the email does not exist
        if(!user){
            return res.status(401).json({message:"Email not registered"})
        }

    //    compare the provided password with the hashed one 
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(401).json({message:"Invalid Password"})
        // generate token (will be neede when a person tries to login)
        const token = jwt.sign({userId:user._id,role:user.role},JWT_SECRET,{expiresIn:'1h'});

        // send a success message
        res.json({
            message:"Login Successfull",
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
            }
        })
    }
        
    } catch (error) {
        res.status(500).json({message:"Login Failed",error:error.message})
    }
}