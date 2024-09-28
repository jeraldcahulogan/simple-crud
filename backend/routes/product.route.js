import express from "express";
import { createProduct, getAllProducts, deleteProductExtra, deleteProduct, updateProductExtra, updateProduct } from "../controllers/product.controller.js";


const router = express.Router();


// Get all products
router.get("/", getAllProducts);


// Add product to DB route
router.post("/", createProduct);


// // Delete product route
// router.delete("/:id", deleteProductExtra);


// Delete product route
router.delete("/:id", deleteProduct);



// // update product route
// router.put("/:id", updateProductExtra);


// update product route
router.put("/:id", updateProduct);


export default router;