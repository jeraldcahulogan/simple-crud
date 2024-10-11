import express from "express";
import dotenv from "dotenv";

//----------------------------------------------------------------------------------------------
import path from "path"; // for deployment
//----------------------------------------------------------------------------------------------

import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000

//---------------------------------------------------------------------------------------------
const __dirname = path.resolve(); // for deployment
//---------------------------------------------------------------------------------------------

// Connect to DB and start server
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});


// // Test route
// app.get("/", (req, res) => {
//     res.send("Hello World server!");
// });


// Middleware
app.use(express.json()); // To accept JSON data in the request body
// app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/products', productRoutes); // Register the product routes



//---------------------------------------------------------------------------------------------

//for deployment
// terminate all in the terminal then run cd .\frontend\ then npm run build. it should create a dist folder in the frontend

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

// delete the node_modules folder in root folder and frontend folder

//in package.json, below the "dev" : "nodemon backend/server.js" line
    // "build" : "npm install && npm install --prefix frontend && npm run build --prefix frontend"

//in terminal, cd to the root not in the frontend using cd..
//then npm run build      //this will install the node_modules in the root and frontend and then build the frontend application

//in package.json, below the "build" : "npm install && npm install --prefix frontend && npm run build --prefix frontend"
    // "start" : "NODE_ENV=production node backend/server.js"

    // change the  "dev": "nodemon backend/server.js", to
        // "dev": "NODE_ENV=development nodemon backend/server.js",

//in terminal of root,  npm run start


// in terminal of root,  git init
// then grab the .gitignore file from the frontend folder and put it in the root folder

//in .gitignore, add .env below the *.local



//-----------------------------------------------------------------------------------------------
//if error, do this:

// npm install cross-env --save-dev

// {
//   "name": "mern-crash-course",
//   "version": "1.0.0",
//   "main": "index.js",
//   "scripts": {
//     "dev": "cross-env NODE_ENV=development nodemon backend/server.js",
//     "build": "npm install && npm install --prefix frontend && npm run build --prefix frontend",
//     "start": "cross-env NODE_ENV=production node backend/server.js"
//   },
//   "type": "module",
//   "keywords": [],
//   "author": "",
//   "license": "ISC",
//   "description": "",
//   "dependencies": {
//     "dotenv": "^16.4.5",
//     "express": "^4.21.0",
//     "mongoose": "^8.6.4"
//   },
//   "devDependencies": {
//     "nodemon": "^3.1.7",
//     "cross-env": "^7.0.3"
//   }
// }
