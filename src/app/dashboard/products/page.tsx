"use client";

import { useEdgeStore } from "../../../lib/edgestore";

import React from "react";
import { useEffect, useState } from "react";
import isAuthenticated from "../../../hooks/IsAuthenticated";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../../api/crud";
import { Product } from "../../../types/types";
import { useToast } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import "./products.css";
import Link from "next/link";

const CrudComponent = () => {
  const [isClient, setIsClient] = useState<boolean>(false);

  // useEffect
  useEffect(() => {
    setIsClient(true);
    const fetchData = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const { user } = isAuthenticated();
  if (!user) {
    return null;
  }

  const toast = useToast();

  const { edgestore } = useEdgeStore();
  const [file, setFile] = useState<File | undefined | null>();
  const [afterImageUpload, setAfterFileUpload] = useState<boolean>(false);

  const [addProducts, setAddProducts] = useState<boolean>(false);

  const [products, setProducts] = useState<Product[]>([]);
  // new product
  const [newProductName, setNewProductName] = useState<string>("");
  const [newProductDescription, setNewProductDescription] =
    useState<string>("");
  const [newProductPrice, setNewProductPrice] = useState<number>(0);
  const [newProductImgPath, setNewProductImgPath] = useState<string>("");
  // update product
  const [updatingProductId, setUpdatingProductId] = useState<number | null>(
    null
  );
  const [updatedProductName, setUpdatedProductName] = useState<string>("");
  const [updatedProductDescription, setUpdatedProductDescription] =
    useState<string>("");
  const [updatedProductPrice, setUpdatedProductPrice] = useState<
    number | undefined
  >(undefined);
  const [updatedProductImgPath, setUpdatedProductImgPath] =
    useState<string>("");

  // create product
  const handleCreateProduct = async () => {
    if (
      !newProductName ||
      !newProductDescription ||
      newProductPrice === undefined ||
      !newProductImgPath
    ) {
      // Show Chakra Toast for validation error
      toast({
        title: "Validation Error",
        description: "Please fill in all fields before creating a product.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const newProductData: Product = {
        id: new Date().valueOf(),
        name: newProductName,
        description: newProductDescription,
        price: newProductPrice,
        imgPath: newProductImgPath,
      };
      const createdProduct = await createProduct(newProductData);
      setProducts((prevProducts) => [...prevProducts, createdProduct]);
      setNewProductName("");
      setNewProductDescription("");
      setNewProductPrice(0);
      setNewProductImgPath("");
      setAfterFileUpload(!afterImageUpload);

      // Show Chakra Toast
      toast({
        title: "Product Created",
        description: `Product "${createdProduct.name}" has been created successfully.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // await new Promise((resolve) => setTimeout(resolve, 1000));

      setAddProducts(false);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  // update product
  const handleUpdateProduct = async (id: number) => {
    setUpdatingProductId(id);
    const productToUpdate = products.find((product) => product.id === id);
    if (productToUpdate) {
      setUpdatedProductName(productToUpdate.name);
      setUpdatedProductDescription(productToUpdate.description);
      setUpdatedProductPrice(productToUpdate.price);
      setUpdatedProductImgPath(productToUpdate.imgPath);
    }
  };

  // delete product
  const handleDeleteProduct = async (id: number) => {
    try {
      await deleteProduct(id);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // save updated product
  const handleSaveUpdate = async (id: number) => {
    try {
      const updatedProductData = {
        id: new Date().valueOf(),
        name: updatedProductName,
        description: updatedProductDescription,
        price: updatedProductPrice,
        imgPath: updatedProductImgPath,
      };
      const updatedProduct: Product = await updateProduct(
        id,
        updatedProductData
      );
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? updatedProduct : product
        )
      );
      setUpdatingProductId(null);
      setUpdatedProductName("");
      setUpdatedProductDescription("");
      setUpdatedProductPrice(0);
      setUpdatedProductImgPath("");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // cancel updated product
  const handleCancelUpdate = () => {
    setUpdatingProductId(null);
    setUpdatedProductName("");
    setUpdatedProductDescription("");
    setUpdatedProductPrice(0);
    setUpdatedProductImgPath("");
  };

  // image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0]);
  };

  // image string to image path
  const handleImageUpload = async () => {
    if (file) {
      try {
        const res = await edgestore.myImages.upload({ file });

        setNewProductImgPath(res.url);
        setAfterFileUpload(!afterImageUpload);

        toast({
          title: "Image Uploaded",
          description: `Image ${file.name} has been uploaded successfully.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <>
      {isClient ? (
        <>
          {/* Header */}
          <div className="header">
            <h2>Products</h2>
          </div>
          {/* Buttons */}
          <div className="buttons">
            <Button
              colorScheme={addProducts ? "red" : "blue"}
              onClick={() => {
                setAddProducts(!addProducts);
              }}
            >
              {addProducts ? "X" : "+ Add Products"}
            </Button>
            <Button colorScheme="teal" size="md">
              <Link href={"/dashboard"}>&#8249; Go to dashboard</Link>
            </Button>
          </div>
          {addProducts && (
            <div className="addingProducts">
              {/* product name */}
              <FormControl>
                <FormLabel style={{ marginTop: "25px" }}>
                  Enter product name
                </FormLabel>
                <Input
                  type="text"
                  placeholder="Enter product name"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                />
              </FormControl>
              {/* product description */}
              <FormControl>
                <FormLabel style={{ marginTop: "5px" }}>
                  Enter product description
                </FormLabel>
                <Input
                  type="text"
                  placeholder="Enter product description"
                  value={newProductDescription}
                  onChange={(e) => setNewProductDescription(e.target.value)}
                />
              </FormControl>
              {/* product price */}
              <FormControl>
                <FormLabel style={{ marginTop: "5px" }}>
                  Enter product price
                </FormLabel>
                <Input
                  type="number"
                  placeholder="0"
                  value={newProductPrice}
                  onChange={(e) => setNewProductPrice(Number(e.target.value))}
                />
              </FormControl>
              {/* Upload File */}
              <div className="fileUpload">
                <FormControl className="fileUploadInput">
                  <FormLabel style={{ marginTop: "5px" }}>
                    Upload Image
                  </FormLabel>
                  <Input
                    htmlSize={4}
                    width="auto"
                    type="file"
                    onChange={handleImageChange}
                  />
                </FormControl>
                <Button
                  className="btnFileUpload"
                  colorScheme="blue"
                  onClick={handleImageUpload}
                  isDisabled={afterImageUpload}
                >
                  Upload Image
                </Button>
              </div>

              {afterImageUpload && (
                <>
                  {/* product image path */}
                  <FormControl>
                    <FormLabel style={{ marginTop: "5px" }}>
                      Product image path
                    </FormLabel>
                    <Input
                      type="text"
                      placeholder="Product image path"
                      value={newProductImgPath}
                      onChange={(e) => setNewProductImgPath(e.target.value)}
                    />
                  </FormControl>
                  <Button
                    style={{ marginTop: "15px" }}
                    colorScheme="blue"
                    onClick={handleCreateProduct}
                  >
                    Create Product
                  </Button>
                </>
              )}
            </div>
          )}

          {/* update products  */}
          {updatingProductId !== null && (
            <div className="update-products-table">
              <FormControl>
                <FormLabel style={{ marginTop: "25px" }}>
                  Update product name
                </FormLabel>
                <Input
                  type="text"
                  placeholder="Enter update product name"
                  value={updatedProductName}
                  onChange={(e) => setUpdatedProductName(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel style={{ marginTop: "5px" }}>
                  Update product description
                </FormLabel>
                <Input
                  type="text"
                  placeholder="Enter update product description"
                  value={updatedProductDescription}
                  onChange={(e) => setUpdatedProductDescription(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel style={{ marginTop: "5px" }}>
                  Update product price
                </FormLabel>
                <Input
                  type="number"
                  placeholder="0"
                  value={updatedProductPrice}
                  onChange={(e) =>
                    setUpdatedProductPrice(Number(e.target.value))
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel style={{ marginTop: "5px" }}>
                  Update product image path
                </FormLabel>
                <Input
                  type="text"
                  placeholder="Enter update product image path"
                  value={updatedProductImgPath}
                  onChange={(e) => setUpdatedProductImgPath(e.target.value)}
                />
              </FormControl>
            </div>
          )}

          {/* show products table  */}
          <div className="products-table">
            <TableContainer>
              <Table variant="striped" colorScheme="teal">
                <Thead>
                  <Tr>
                    <Th>#</Th>
                    <Th>Product name</Th>
                    <Th>Product description</Th>
                    <Th>Product price</Th>
                    {/* <Th>Product image path</Th> */}
                    <Th>Update / Delete</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {products.map((product, index) => (
                    <Tr key={product.id}>
                      <Td>{index + 1}</Td>
                      <Td>{product.name}</Td>
                      <Td>{product.description}</Td>
                      <Td>{product.price}</Td>
                      {/* <Td>{product.imgPath}</Td> */}
                      <Td>
                        {updatingProductId === product.id ? (
                          <>
                            <Button
                              style={{ marginRight: "5px" }}
                              colorScheme="green"
                              onClick={() => handleSaveUpdate(product.id)}
                            >
                              Save
                            </Button>
                            <Button
                              colorScheme="red"
                              onClick={handleCancelUpdate}
                            >
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              style={{ marginRight: "5px" }}
                              colorScheme="blue"
                              onClick={() => handleUpdateProduct(product.id)}
                            >
                              Update
                            </Button>
                            <Button
                              colorScheme="red"
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              Delete
                            </Button>
                          </>
                        )}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </div>
        </>
      ) : null}
    </>
  );
};

export default CrudComponent;
