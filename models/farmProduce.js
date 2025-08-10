// specify the db schema
const mongoose=require('mongoose');

// create the schema
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{type:String,required:true,},
    email:{type:String,required:true,unique:true,},
    password:{type:String,required:true},
    phone:{type:String},
    role:{type:String,enum:['farmer','buyer','admin'],required:true,},
    location:{
        county:{type:String},
        subCounty:{type:String},
        village:{type:String},
    }
    
}, {timestamps:true,});

// produce post schema
const producePostSchema = new Schema({
    farmerId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    title:{type:String,required:true,trim:true},
    category:{type:String,required:true,},
    description:{type:String,required:true,maxlength:500,},
    quantity:{type:Number,required:true,min:1},
    unit:{type:String,required:true,enum:['kg','bag','crate','ton','litre',]},
    pricePerUnit:{type:Number,required:true,min:0},
    photo:{type:String},
    location:{
        county:{type:String},
        subCounty:{type:String},
        village:{type:String},
    }


},{timestamps:true})

// exporting the schemas
const User = mongoose.model('User',userSchema);
const Produce = mongoose.model('Produce',producePostSchema)

module.exports={User,Produce};
