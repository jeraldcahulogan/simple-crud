// in terminal run npm i zustand
import { create } from "zustand";                               // Importing the `create` function from the "zustand" library. `Zustand` is a small, fast state-management library for React apps.

export const useProductStore = create((set) => ({               // Exporting the custom hook `useProductStore` which contains state and actions. The `set` function is used to update the state.
    products: [],                                               // Initializing the `products` state as an empty array. This will hold all product objects.

    setProducts: (products) => set({ products }),               // `setProducts` is a function that updates the `products` state with the given array of products.

    createProduct : async (newProduct) => {                     // `createProduct` is an asynchronous function responsible for adding a new product to the store and database.
        
        // Check if all required fields (name, price, image) are provided.
        if (!newProduct.name || !newProduct.price || !newProduct.image) { 
            return { success: false, message: "All fields are required" }; // If any field is missing, return an object with a `success: false` and a message.
        }

        // Send a POST request to the "/api/products" endpoint to add the new product to the backend.

        // go to the vite.config.js file and add the following lines, below the plugins:
        // server: {
        //     proxy: {
        //       '/api': {
        //         target: 'http://localhost:5000',
        //         changeOrigin: true
        //       }
        //     }
        //   }

        const res = await fetch("/api/products", {                      
            method: "POST",                                     // Specify the HTTP method as POST since we are adding new data.
            headers: {
                "Content-Type": "application/json",             // Setting the content type to JSON so the server knows the type of data being sent.
            },
            body: JSON.stringify(newProduct),                   // Converting the `newProduct` object into a JSON string and attaching it to the request body.
        });

        const data = await res.json();                          // Parsing the JSON response from the server, which includes the newly created product data.

        // Update the `products` state by adding the newly created product to the existing array of products.
        set((state) => ({ products: [...state.products, data.data] })); // Spread the existing products and add the new one (`data.data` is the product from the server).

        return { success: true, message: "Product created successfully" }; // Return an object indicating that the product was successfully created.
    }
}));
