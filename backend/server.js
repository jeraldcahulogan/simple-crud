import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();

// Connect to DB and start server
app.listen(5000, () => {
    connectDB();
    console.log("Server is running on port 5000");
});


// Test route
app.get("/", (req, res) => {
    res.send("Hello World server!");
});


// Middleware
app.use(express.json()); // To accept JSON data in the request body

// Routes
app.use('/api/products', productRoutes); // Register the product routes