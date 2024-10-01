import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from "@chakra-ui/react";   // Import required components and hooks from Chakra UI
import { useState } from "react";                                                                       // Import useState hook to manage form state
import { useProductStore } from "../store/product.js";                                                     // Import the custom hook to interact with the product store

const CreatePage = () => {                                                                              // Define the CreatePage component

    const [newProduct, setNewProduct] = useState({      // state is newProduct and setState is setNewProduct and initialState is empty name, price, and image
        name: "",                                       // Product name field
        price: "",                                      // Product price field
        image: ""                                       // Product image field
    });

    
    const toast = useToast();                           // Create a toast instance, which is a small notification that appears at the bottom of the screen.

    // This allows us to use the createProduct function in our component, which will be used to add a new product to the store when the form is submitted.
    const { createProduct } = useProductStore();                        // Destructure createProduct function from the product store hook 

    const handleAddProduct = async () => {                              // Define function to handle form submission
        const {success, message} = await createProduct(newProduct);     // Call createProduct and wait for response

        if (!success) {                                                 // If response is not successful
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true
            });
        } 
        else {                                                          // If response is successful
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true
            });
        }

        setNewProduct({name: "", price: "", image: ""});                // Reset form fields
    };

    return (  // Return the component's JSX
        <Container maxW={"container.sm"}>                                       {/*  Container with max width setting for responsiveness */}
            <VStack spacing={8}>                                                {/* Vertical stack with spacing between elements */}

                <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>    {/* Heading for the page title */}
                    Create New Product
                </Heading>

                <Box w={"full"} p={4} bg={useColorModeValue("white", "gray.800")} padding={6} rounded={"lg"} shadow={"md"}>  {/* Box to style the form section */}
                    <VStack spacing={4}>                                                            {/* Vertical stack for form inputs with spacing */}

                        <Input 
                            placeholder="Product Name"                                              // Placeholder text for product name input
                            name="name"                                                             // Name attribute for the input
                            value={newProduct.name}                                                 // Controlled input with value from newProduct state
                            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}  // Update state when input changes
                        />

                        <Input 
                            placeholder="Price"                                                     // Placeholder text for price input
                            name="price"                                                            // Name attribute for the input
                            type="number"                                                           // Input type set to number for price
                            value={newProduct.price}                                                // Controlled input with value from newProduct state
                            onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} // Update state when input changes
                        />

                        <Input
                            placeholder="Image URL"                                                 // Placeholder text for image URL input
                            name="image"                                                            // Name attribute for the input
                            value={newProduct.image}                                                // Controlled input with value from newProduct state
                            onChange={(e) => setNewProduct({...newProduct, image: e.target.value})} // Update state when input changes
                        />

                        <Button colorScheme="blue" onClick={handleAddProduct} w={"full"}>   {/* Button to submit the form, calls handleAddProduct function */}
                            Add Product                                                     {/*  Button text */}
                        </Button>

                    </VStack>
                </Box>

            </VStack>
        </Container>
    )
}

export default CreatePage;  // Export the CreatePage component
