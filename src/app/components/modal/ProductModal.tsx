import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { Product } from "@/types/types";

interface UpdateProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  handleSaveUpdate: (id: number) => void;
  handleCancelUpdate: () => void;
  setUpdatedProductName: (value: string) => void;
  setUpdatedProductDescription: (value: string) => void;
  setUpdatedProductPrice: (value: number) => void;
  setUpdatedProductImgPath: (value: string) => void;
  setUpdatedProductKey: (value: string) => void;
}

const UpdateProductModal: React.FC<UpdateProductModalProps> = ({
  isOpen,
  onClose,
  product,
  handleSaveUpdate,
  handleCancelUpdate,
  setUpdatedProductName,
  setUpdatedProductDescription,
  setUpdatedProductPrice,
  setUpdatedProductImgPath,
  setUpdatedProductKey,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Input fields for updating the product */}
          <FormControl>
            <FormLabel>Update product name</FormLabel>
            <Input
              type="text"
              value={product.name}
              onChange={(e) => setUpdatedProductName(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Update product description</FormLabel>
            <Input
              type="text"
              value={product.description}
              onChange={(e) => setUpdatedProductDescription(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Update product price</FormLabel>
            <Input
              type="number"
              value={product.price}
              onChange={(e) => setUpdatedProductPrice(Number(e.target.value))}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Update product key</FormLabel>
            <Input
              type="text"
              value={product.productKey}
              onChange={(e) => setUpdatedProductKey(e.target.value)}
              disabled={true}
            />
          </FormControl>

          <FormControl mb={5}>
            <FormLabel>Update product image path</FormLabel>
            <Input
              type="text"
              value={product.imgPath}
              onChange={(e) => setUpdatedProductImgPath(e.target.value)}
              disabled={true}
            />
          </FormControl>

          <Button
            colorScheme="green"
            onClick={() => handleSaveUpdate(product.id)}
          >
            Save
          </Button>
          <Button colorScheme="red" ml={3} onClick={handleCancelUpdate}>
            Cancel
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UpdateProductModal;
