const express = require("express");
const router = express.Router();
const produceController = require("../controllers/produceController");
const { auth } = require("../middlewares/auth");

// Add Product (with image upload)
router.post(
  "/",
  auth,
  produceController.uploadProductPhoto,
  produceController.addProduct
);

// Get all products
router.get("/", produceController.getAllProduct);

// Get product by ID
router.get("/:id", produceController.getProductById);

// Update product
router.put("/:id", produceController.updateProducts);

// Delete product
router.delete("/:id", produceController.deleteProduct);

module.exports = router;
