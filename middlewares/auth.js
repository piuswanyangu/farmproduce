// to check whether a person has authorizasion token
// import the jwt
const jwt =require("jsonwebtoken")
// import the secretkey itself
const JWT_SECRET=process.env.JWT_SECRET;


// create the auth function
const auth = (req,res,next)=>{
    // extract auth headers
    const authHeader =req.headers.authorization;
    // check the auth headers then
    // console.log(authHeader)

    // split the headers into array using space
    // so far the header usually contains the keyword "bearer" concatinated with the token
    // after the split happens the "bearer" appears on index = 0 and the token appears on second index=1
    const token = authHeader && authHeader.split(' ')[1];

    // check whether the request sent containers the token
    if(!token){
        return res.status(401).json({message:"No token provided"})
    }

    // check whether the token is valid or not
    try{
        // verify the validity of token using jwt secret
        const decoded =jwt.verify(token,JWT_SECRET);
        // attach the payload to the request object
        req.user=decoded;
        // if it is valid proceed to the next step
        next();
    }catch(error){
        // if the token is invalid return a response
        res.status(403).json({message:"Invalid Token"})
    }

};
// Middleware shall be used to authorize access resources based on the users role
// Accepts any number of allowed roles(e.g 'admin','farmer','buyers')
// usage: authorizeRoles('admin','farmer','buyer)
// ...params - accepts any number of arguments and automatically put them into an array
const authorizeRoles = (...allowedRoles)=>{
    return(req,res,next)=>{
        if(!req.user||!allowedRoles.includes(req,user.role)){
            return res.status(403).json({message:"Access Denied  you dont have permission to vie this site"})
        }
        // if the user is authorized then proceed to the next step
        next();
    }

}
// export the two  functions to make them accesible over the application
module.exports={auth,authorizeRoles};