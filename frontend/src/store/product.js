// in terminal run npm i zustand
import { create } from "zustand";                              // Importing the `create` function from the "zustand" library. `Zustand` is a small, fast state-management library for React apps.

export const useProductStore = create((set) => ({              // Exporting the custom hook `useProductStore` that contains the state and actions to manage the products. 
                                                               // The `set` function is used to update the store's state.

    products: [],                                              // Initializing the `products` state as an empty array. This will store the list of all products.

    setProducts: (products) => set({ products }),              // The `setProducts` function updates the `products` state with a new array of products.

    createProduct : async (newProduct) => {                    // `createProduct` is an asynchronous function to add a new product to both the store and backend.
        
        // Ensure all required fields (name, price, image) are provided before proceeding with the creation of the product.
        if (!newProduct.name || !newProduct.price || !newProduct.image) { 
            return { success: false, message: "All fields are required" };    // If any field is missing, return an error message.
        }

        // Send a POST request to the "/api/products" endpoint to add the new product to the backend.

        // If you encounter CORS issues with the API, configure a proxy in the Vite config file:
        // go to the vite.config.js file and add the following lines below the plugins:
        // server: {
        //     proxy: {
        //       '/api': {
        //         target: 'http://localhost:5000',
        //         changeOrigin: true
        //       }
        //     }
        //   }

        const res = await fetch("/api/products", {                       
            method: "POST",                                     // Specify the HTTP method as POST since we are sending new data to the server.
            headers: {
                "Content-Type": "application/json",             // Setting the content type to JSON to inform the server of the type of data being sent.
            },
            body: JSON.stringify(newProduct),                   // Convert the `newProduct` object into a JSON string to send in the request body.
        });

        const data = await res.json();                          // Parse the JSON response from the server, which contains the new product's details.

        // Update the `products` state by adding the newly created product to the existing list.
        set((state) => ({ products: [...state.products, data.data] })); // Spread the current `products` array and add the new product (`data.data`).

        return { success: true, message: "Product created successfully" }; // Return success confirmation once the product is added.
    },

    fetchProducts: async () => {                               // `fetchProducts` is an async function that fetches all products from the server.
        const res = await fetch("/api/products");              // Send a GET request to fetch products from the backend.
        const data = await res.json();                         // Parse the JSON response which contains the list of products.
        set({ products: data.data });                          // Update the `products` state with the fetched data from the server.
    },

    deleteProduct: async (pid) => {                            // `deleteProduct` is an async function that deletes a product by its ID.
        const res = await fetch(`/api/products/${pid}`, {      // Send a DELETE request to remove the product with the given ID (`pid`).
            method: "DELETE",
        });
        const data = await res.json();                         // Parse the JSON response which contains success or error information.

        if (!data.success) return { success: false, message: data.message }; // Return an error if the deletion failed.

        // Update the UI immediately by removing the deleted product from the `products` array.
        set((state) => ({
            products: state.products.filter((product) => product._id !== pid), // Remove the product with the matching ID from the state.
        }));

        return { success: true, message: data.message };        // Return success message upon successful deletion.
    },

    updateProduct: async (pid, updatedProduct) => {             // `updateProduct` is an async function that updates the details of a product.
        const res = await fetch(`/api/products/${pid}`, {       // Send a PUT request to update the product with the given ID (`pid`).
            method: "PUT",
            headers: {
                "Content-Type": "application/json",             // Set content type to JSON to inform the server about the data type.
            },
            body: JSON.stringify(updatedProduct),               // Convert the updated product details to a JSON string for sending in the request body.
        });
        const data = await res.json();                          // Parse the JSON response which contains the updated product details.

        if (!data.success) {                                    // If the update was unsuccessful, return an error.
            return { success: false, message: 'Something went wrong' };
        } 
        
        // Update the `products` state with the new updated product details.
        set((state) => ({
            products: state.products.map((product) => product._id === pid ? data.data : product), // Replace the old product details with the updated data.
        }));
        return { success: true, message: 'Product updated successfully' }; // Return success message upon successful update.
    }

}));
