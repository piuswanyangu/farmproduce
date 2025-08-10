// import the express
const express = require('express');
// import the mongoose
const mongoose = require('mongoose')

// import the cors for frontend to connect with the backend via database

const cors = require('cors');
// create the port
const PORT = process.env.PORT || 3000;
// create the app
const app = express();
app.use(cors());

// import the dotenv
require('dotenv').config()

// specify the format you will receive data with
app.use(express.json());

// specify the route to register admin
const loginRoutes = require("./routes/loginRoute")
app.use("api/auth",loginRoutes)

// connect to database
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("MongoDB Successfully connected")
}).catch((err)=>{
    console.log("MongoDB failed to connect",err)
})

// make the app to listen to port
app.listen(PORT,()=>{
    console.log(`The server is listenning to port : ${PORT}`)
})




