import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  Button,
  NumberInput,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputStepper,
  NumberInputField,
  Flex,
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useDisclosure,
  useToast,
  CircularProgress,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from "@chakra-ui/react";
import { ProductInterface } from "../interfaces/product";
import useApp from "../hook/useApp";
import { useState, useRef, useEffect } from "react";
import apiClient from "../config/axiosClient";
import { releaseImgUrl } from "../helpers/cloudinaty.helper";
import {
  createFormData,
  getDifferentFields,
  validateExistChangesToUpdate,
} from "../utils/validators";
import { useToastResponses } from "../hook/useToastResponses";
import { CategoryInterface } from "../interfaces/category";
import { updateProduct } from "../api/product.api";
type productoProp = {
  producto: ProductInterface;
  key: number;
  isAdmin: boolean;
};

interface ProductForm {
  img?: string | File | FileList;
  category?: CategoryInterface | number | string;
  name?: string;
  description?: string;
  price?: number | string;
}

export default function Producto({ producto, isAdmin = false }: productoProp) {
  const { handleAddToCarrito, categories } = useApp();
  const [quantity, setQuantity] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const { error, success, warning } = useToastResponses();
  const [editProduct, setEditProduct] = useState<ProductForm>({
    category: producto.category,
    description: producto.description,
    img: producto.img,
    name: producto.name,
    price: producto.price,
  });

  useEffect(() => {
    if (!isOpen1) {
      setEditProduct({
        category: producto.category,
        description: producto.description,
        img: producto.img,
        name: producto.name,
        price: producto.price,
      });
    }
  }, [isOpen1, producto]);

  const handleChangeProduct = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.target.type === "file") {
      const fileInput = e.target as HTMLInputElement;
      if (fileInput?.files?.length) {
        const file = fileInput.files[0]; // Accedemos al archivo seleccionado
        setEditProduct({ ...editProduct, img: file });
      }
    } else {
      setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
    }
  };

  const onSubmitEditProduct = async () => {
    setIsLoading(true);
    const formData: ProductForm = getDifferentFields(editProduct, producto);

    if (!validateExistChangesToUpdate(formData)) {
      warning("No existen cambios por actualizar");
      setIsLoading(false);
      return;
    }
    if (
      formData.description === "" ||
      formData.price === "" ||
      formData.name === "" ||
      formData.category === ""
    ) {
      setIsLoading(false);
      error("Faltan Campos Porfavor completalos");
      return;
    }
    if (formData.price) formData.price = Number(formData.price);
    if (formData.category) formData.category = Number(formData.category);

    const formDataa = createFormData(formData);
    try {
      const response = await updateProduct(formDataa, producto.id);
      if (!response.data.ok) throw new Error("err");
      success("Changes Saved Successfuly");
      onClose1();
      setIsLoading(false);
      return;
    } catch (errorFromCatch) {
      error("Valores Invalidos"), setIsLoading(false);
      return;
    }
  };

  return (
    <Card
      maxW="sm"
      boxShadow="2px 6px 10px rgb(255, 202, 204)" // Sombra con color rojo
      bg={"ly.900"}
    >
      <CardBody color={"ly.700"}>
        <Image
          src={releaseImgUrl(producto.img)}
          w={400}
          h={300}
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{producto.name}</Heading>
          <Text>{producto.description}</Text>
          <Text color="ly.700" fontSize="2xl">
            ${producto.price}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        {isAdmin ? (
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            gap={2}
            direction={{ base: "row" }}
          >
            <Button
              onClick={() => onOpen1()}
              variant="solid"
              colorScheme="blue"
              shadow={"xl"}
            >
              Editar
            </Button>
            <Button
              onClick={() => onOpen()}
              variant="solid"
              colorScheme="red"
              shadow={"xl"}
            >
              Eliminar
            </Button>
          </Flex>
        ) : (
          <Flex
            justifyContent={"space-evenly"}
            alignItems={"center"}
            w={"full"}
            direction={{ base: "row", md: "column", xl: "row" }}
          >
            <NumberInput
              size="lg"
              color={"ly.700"}
              bg={"white"}
              maxW={20}
              min={1}
              value={quantity}
              onChange={(_, value) => setQuantity(value)}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper color={"ly.700"} />
                <NumberDecrementStepper color={"ly.700"} />
              </NumberInputStepper>
            </NumberInput>
            <Button
              onClick={() => handleAddToCarrito({ ...producto, quantity })}
              variant="ghost"
              _hover={{ backgroundColor: "blue.500", cursor: "pointer" }}
              color={"ly.900"}
              bg={"ly.700"}
            >
              Añadir al Carrito
            </Button>
          </Flex>
        )}
      </CardFooter>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Presiona si para confirmar?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>Estas seguro que deseas eliminar?</AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={onClose}>No</Button>
            {isLoading ? (
              <Flex justifyContent={"center"} alignItems={"center"}>
                <CircularProgress isIndeterminate color="green.300" />
              </Flex>
            ) : (
              <Button
                onClick={async () => {
                  try {
                    const response = await apiClient.put(
                      `/product/${producto.id}`,
                      {
                        stock: false,
                      },
                      {
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem(
                            "token"
                          )}`,
                        },
                      }
                    );
                    if (!response.data.ok) throw new Error("err");
                    setIsLoading(false);
                    toast({
                      title: "Producto eliminado correctamente",
                      status: "error",
                      duration: 2000,
                      position: "top-left",
                      isClosable: true,
                    });
                    onClose();
                    return;
                  } catch (error) {
                    setIsLoading(false);
                    toast({
                      title: "Error on Server",
                      status: "error",
                      duration: 2000,
                      position: "top-left",
                      isClosable: true,
                    });
                  }
                }}
                colorScheme="red"
                ml={3}
              >
                Si
              </Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Modal isOpen={isOpen1} onClose={onClose1}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <Heading mb={4}>Editar Producto</Heading>
              <FormControl>
                <FormLabel>Nombre</FormLabel>
                <Input
                  type="text"
                  name="name"
                  onChange={handleChangeProduct}
                  value={editProduct.name}
                  placeholder="Your product name"
                  focusBorderColor="gray.600"
                  borderColor={"whiteAlpha.300"}
                  shadow={"xl"}
                  _placeholder={{ color: "gray.400" }}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Descripcion</FormLabel>
                <Input
                  type="text"
                  name="description"
                  onChange={handleChangeProduct}
                  value={editProduct.description}
                  placeholder="Your description"
                  focusBorderColor="gray.600"
                  borderColor={"whiteAlpha.300"}
                  shadow={"xl"}
                  _placeholder={{ color: "gray.400" }}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Imagen</FormLabel>
                <input type="file" onChange={handleChangeProduct} name="img" />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Categoria</FormLabel>

                <Select
                  defaultValue={
                    (editProduct.category as ProductInterface).id || 1
                  }
                  placeholder="Select category"
                  name="category"
                  onChange={handleChangeProduct}
                >
                  {categories?.map((category) => (
                    <option value={category.id}>{category.name}</option>
                  ))}
                </Select>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Precio</FormLabel>
                <Input
                  onChange={handleChangeProduct}
                  value={editProduct.price}
                  type="number"
                  name="price"
                  placeholder="Your price"
                  focusBorderColor="gray.600"
                  borderColor={"whiteAlpha.300"}
                  shadow={"xl"}
                  _placeholder={{ color: "gray.400" }}
                />
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter display={"flex"} justifyContent={"space-between"}>
            {isLoading ? (
              <Flex justifyContent={"center"} alignItems={"center"}>
                <CircularProgress isIndeterminate color="green.300" />
              </Flex>
            ) : (
              <Button
                onClick={() => onSubmitEditProduct()}
                type="submit"
                colorScheme="blue"
                width={"full"}
              >
                Guardar Cambios
              </Button>
            )}
            <Button colorScheme="red" ml={1} onClick={onClose1}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
}
