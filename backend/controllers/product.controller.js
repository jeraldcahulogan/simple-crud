import Product from "../models/product.model.js";
import mongoose from "mongoose";

// Get all products controller
export const getAllProducts = async(req, res) => {
    try {
        const products = await Product.find({});   // Find all products
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


// Create product controller
export const createProduct = async(req, res) => {

    const product = req.body;   // req.body contains the product data

    if (!product.name || !product.price || !product.image) {    // Check if all fields are filled
        console.log("all fields are required");
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newProduct = new Product(product);    // Create new product

    try {   // Save product to DB

        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });

    } catch (error) {   // Error handling
        console.error("Error in creating product: ", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
        
    }
};


// Delete extra product controller
export const deleteProductExtra = async(req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Product not found" });
    }

    try {

        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted successfully" });

    } catch (error) {
        return res.status(500).json({ success: false, message: " Internal server error " });
    }
}; 


// Delete product controller
export const deleteProduct = async(req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


// Update extra product controller
export const updateProductExtra = async(req, res) => {
    const { id } = req.params;

    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Product not found" });
    }

    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


// Update product controller
export const updateProduct = async(req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};