import {
  Button,
  CircularProgress,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Tab,
  TabIndicator,
  TabList,
  Tabs,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMediaQuery } from "react-responsive";
import useApp from "../../hook/useApp";
import apiClient from "../../config/axiosClient";
import MenuMobile from "../../components/MenuMobile";
import Home from "../home/Home";

export default function Products() {
  const { categories, handleClickCategory } = useApp();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, register, getValues } = useForm();
  const toast = useToast();

  const validateProduct = () => {
    const name: string = getValues("name").toString().trim();
    const description: string = getValues("description").toString().trim();
    const img = getValues("img");
    const category: string = getValues("category").toString().trim();
    const price: string = getValues("price").toString().trim();

    if (name === "") {
      toast({
        title: "Ingrese un Nombre Valido",
        status: "error",
        duration: 1000,
        position: "top-left",
        isClosable: true,
      });
      setIsLoading(false);
      return false;
    }

    if (description === "") {
      toast({
        title: "Ingrese una Descripcion Valida",
        status: "error",
        duration: 2000,
        position: "top-left",
        isClosable: true,
      });
      setIsLoading(false);
      return false;
    }
    if (category === "") {
      toast({
        title: "Ingrese una Categoria Valida",
        status: "error",
        duration: 2000,
        position: "top-left",
        isClosable: true,
      });
      setIsLoading(false);
      return false;
    }

    if (img.length < 1) {
      toast({
        title: "Ingrese una Imagen Valida",
        status: "error",
        duration: 2000,
        position: "top-left",
        isClosable: true,
      });
      setIsLoading(false);
      return false;
    }

    if (price === "") {
      toast({
        title: "Ingrese una Precio Valido",
        status: "error",
        duration: 2000,
        position: "top-left",
        isClosable: true,
      });
      setIsLoading(false);
      return false;
    }
    return true;
  };

  const onSubmitNewProduct = async () => {
    setIsLoading(true);
    if (!validateProduct()) return;
    const formData = new FormData();
    const values = getValues();
    Object.entries(values).forEach(([key, value]) => {
      if (key === "img") {
        formData.append(key, value[0]);
      } else {
        formData.append(key, value);
      }
    });
    try {
      const response = await apiClient.post("/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.ok) {
        toast({
          title: `${response.data.body.name} creado correctamente`,
          status: "success",
          duration: 2000,
          position: "top-left",
          isClosable: true,
        });
        setIsLoading(false);
        onClose();
      } else {
        throw new Error("err");
      }
    } catch (error) {
      toast({
        title: "Error de Servidor",
        status: "error",
        duration: 2000,
        position: "top-left",
        isClosable: true,
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      {isMobile ? (
        <Flex
          shadow={"2xl"}
          justifyContent={"flex-start"}
          alignContent={"center"}
          pb={1}
          gap={5}
        >
          <MenuMobile />
          <Button
            onClick={onOpen}
            _hover={{ bgColor: "orange.400" }}
            bgColor={"orange.300"}
            rounded={"md"}
          >
            Crear Nuevo Producto
          </Button>
        </Flex>
      ) : (
        <Tabs position="relative" variant="unstyled">
          <TabList gap={2}>
            <Button
              onClick={onOpen}
              _hover={{ bgColor: "orange.400" }}
              bgColor={"orange.300"}
              rounded={"md"}
            >
              Crear Nuevo Producto
            </Button>
            {categories?.map((category) => (
              <Tab
                fontSize={"lg"}
                p={2}
                color={"ly.700"}
                onClick={() => handleClickCategory(category.id)}
              >
                {category.name}
              </Tab>
            ))}
          </TabList>
          <TabIndicator
            mt="-1.5px"
            height="4px"
            bg="orange.300"
            borderRadius="1px"
          />
        </Tabs>
      )}
      <Home isAdmin={true} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Crear</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form encType="multipart/form-data">
              <Heading mb={4}>Nuevo Producto</Heading>
              <FormControl>
                <FormLabel>Nombre</FormLabel>
                <Input
                  {...register("name")}
                  type="text"
                  placeholder="Tu nombre del producto"
                  focusBorderColor="gray.600"
                  borderColor={"whiteAlpha.300"}
                  shadow={"xl"}
                  _placeholder={{ color: "gray.400" }}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Descripcion</FormLabel>
                <Input
                  {...register("description")}
                  type="text"
                  placeholder="Tu description"
                  focusBorderColor="gray.600"
                  borderColor={"whiteAlpha.300"}
                  shadow={"xl"}
                  _placeholder={{ color: "gray.400" }}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Imagen</FormLabel>
                <input type="file" {...register("img")} name="img" />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Categoria</FormLabel>

                <Select
                  defaultValue={categories ? categories[0].id : 1}
                  placeholder="Tu categoria"
                  {...register("category")}
                >
                  {categories?.map((category) => (
                    <option value={category.id}>{category.name}</option>
                  ))}
                </Select>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Precio</FormLabel>
                <Input
                  {...register("price")}
                  type="number"
                  placeholder="Tu precio"
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
                onClick={handleSubmit(onSubmitNewProduct)}
                type="submit"
                colorScheme="blue"
                width={"full"}
              >
                Crear
              </Button>
            )}
            <Button colorScheme="red" ml={1} onClick={onClose}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/*Modal of Create */}
    </>
  );
}
