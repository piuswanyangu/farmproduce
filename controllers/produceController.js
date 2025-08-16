// import the  produce shema
const{Product,User}=require('../models/farmProduce')



// import the fils system
const fs=require("fs")
// import the multer
const multer=require("multer")

// import the path module so as to get the path of the image
const path = require("path")


const upload = multer({ dest: "uploads/" });
exports.uploadStudentPhoto = upload.single("photo");
// add product function
exports.addProduct=async (req,res) => {
    try {
        // destructure the produce details
        // console.log("The request body",req.body)
        // get produce details from req.body
        const{farmerId,title,category,description,quantity,unit,pricePerUnit,product_Photo,county,subCounty,village}=req.body;
        console.log(
          farmerId,
          title,
          category,
          description,
          quantity,
          unit,
          pricePerUnit,
          product_Photo,
          county,
          subCounty,
          village
        );
// find the farmer by user of the id
const farmer = await User.findById(farmerId)
if(!farmer){
    return res.status(400).json({message:"Farmer Not Found"})
}

// handle the photo
let photo =null;
if(req.file){
    const ext = path.extname(req.file.originalname);
    const newFileName = Date.now() + ext;
    const newPath=path.join("uploads",newFileName);
    fs.renameSync(req.file.path,newPath);

    photo = newPath.replace(/\\/g,"/")
}

// create and save the product
const newProduct = new Product({
  farmerId: user._id,
  title,
  category,
  description,
  quantity,
  unit,
  pricePerUnit,
  product_Photo,
  county,
  subCounty,
  village,
});

 await newProduct.save();

return res.status(201).json({message:"Product added successfully"})

} catch (error) {
        // catch any error that may occur when add a product to the database
        res.status(500).json({message:"Error adding the product",error:error.message})
    }
}


// ==========================================
// getting product by use of Id
exports.getProductById= async (req,res) => {
    try {
        // find product by id
        const product = await Product.findById(req.params.id);
        // if the product is not found return
        if(!product){
            return res.status(404).json({message:"Product Not Found"})
        }
        // if the product is found return the product
        res.status(200).json(product);
        
    } catch (error) {
        // catch any erro that may arise during the fetching of  the product by id
        res.status(500).json({message:"Error fetching product by id",error:error.message})
    }
}

//  ==============================
// getting all the produce in store
exports.getAllProduct=async (req,res) => {
    try {
        // use find method to fetch all the producst
        const products= await Product.find().populate('farmerId','name email phone location');
        res.json(products)
        
    } catch (error) {
        // catch any error that may arise during the fetching in of products
        res.status(500).json({message:"Error fetching products",error:error.message})
    }
}

// ================================
// updating the produce
exports.updateProducts =async (req,res)=>{
    try {
        // find the product by id and update it
        const updatedProduct = await Products.findByIdAndUpdate(req.params.id,req.body,{new:true})
        // if the passed in id is not found return
        if(!updatedProduct){
            return res.status(404).json({message:"Product Not Found"})
        }
        // if successfull return the updated product
        res.status(200).json(updatedProduct)
        
    } catch (error) {
        // catch any error that may occur during updating the product
        res.status(500).json({message:"Error updating the product",error:error.message})
    }
}

// =========================================
// deleting the product
exports.deleteProduct = async (req,res) => {
    try {
        // find the product by id and delete
        const deletedProduct = await Product.findByIdAndDelete(req.params.id)
        // if the product not found return
        if(!deletedProduct){
            return res.status(404).json({message:"Product Not Found"})
        }
        // if successfull return the deleted product
        res.status(200).json({message:"Product deleted successfully",product:deletedProduct})

        
    } catch (error) {
        // catch any erro that may occur during the deleting product process
        res.status(500).json({message:"Error deleting the product",error:error.message})
    }
}