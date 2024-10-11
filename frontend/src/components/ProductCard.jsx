/* eslint-disable react/prop-types */
import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { Box, Button, Heading, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast, VStack } from "@chakra-ui/react"
import { useProductStore } from "../store/product"
import { useState } from "react";

// go to eslint.config.js and add the following lines, under the rules:
// "react/prop-types": "off",

const ProductCard = ({product}) => {

    const [updatedProduct, setUpdatedProduct] = useState(product);

    const textColor = useColorModeValue('gray.600', 'gray.200')
    const bg = useColorModeValue('white', 'gray.800')

    const { deleteProduct } = useProductStore();

    const toast = useToast();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleDeleteProduct = async(pid) => {
        const {success, message} = await deleteProduct(pid)
        
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true
            })
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true
            })
        }
    };

    const { updateProduct } = useProductStore();
    const handleUpdateProduct = async(pid, updatedProduct) => {
        const {success, message} = await updateProduct(pid, updatedProduct);
        onClose();
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true
            })
        } 
        else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true
            })
        }
    }

    return (
        <Box
            shadow='lg'
            rounded='lg'
            overflow={'hidden'}
            transition='all 0.3s'
            _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
            bg={bg}
        >
            <Image src={product.image} alt={product.name} h={48} w='full' objectFit={'cover'}/> 

            <Box p={4}>
                <Heading as={'h3'} size={'md'} mb={2}>
                    {product.name}
                </Heading>

                <Text fontWeight={'bold'} fontSize={'xl'} mb={4} color={textColor}>
                    ₱ {product.price}
                </Text>

                <HStack>
                    <IconButton icon={<EditIcon />} onClick={onOpen}  colorScheme="blue"></IconButton>
                    <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteProduct(product._id)} colorScheme="red"></IconButton>
                </HStack>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                
                    <ModalContent>
                        <ModalHeader>Update Product</ModalHeader>
                        <ModalCloseButton />

                        {/* the form for updating a product */}
                        <ModalBody>
                            <VStack spacing={4}>
                                <Input 
                                    placeholder="Product Name" 
                                    name="name"
                                    value={updatedProduct.name}
                                    onChange={(e) => setUpdatedProduct({ ...updateProduct, name: e.target.value })}
                                    />

                                <Input 
                                    placeholder="Price" 
                                    name="price"
                                    value={updatedProduct.price}
                                    onChange={(e) => setUpdatedProduct({ ...updateProduct, price: e.target.value })}
                                    />
                                
                                <Input 
                                    placeholder="Image URL" 
                                    name="image"
                                    value={updatedProduct.image}
                                    onChange={(e) => setUpdatedProduct({ ...updateProduct, image: e.target.value })}
                                    />
                                

                            </VStack>
                        </ModalBody>

                        {/* Button for updating a product and cancel the update */}
                        {/* onClick={handleUpdateProduct} */}
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={ () => handleUpdateProduct(product._id, updatedProduct)}> 
                                Update
                            </Button>
                            <Button variant={'ghost'} onClick={onClose}>
                                Cancel
                            </Button>
                        </ModalFooter>

                    </ModalContent>
            </Modal>

        </Box>
    )
}

export default ProductCard
