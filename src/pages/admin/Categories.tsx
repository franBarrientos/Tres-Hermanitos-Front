import {
  Flex,
  Button,
  Tabs,
  TabList,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Heading,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  CircularProgress,
  useDisclosure,
  useToast,
  SimpleGrid,
  Box,
  Text,
} from "@chakra-ui/react";
import MenuMobile from "../../components/MenuMobile";
import { useMediaQuery } from "react-responsive";
import { useForm } from "react-hook-form";
import { useState } from "react";
import apiClient from "../../config/axiosClient";
import useApp from "../../hook/useApp";
import { CategoryCard } from "../../components/CategoryCard";

export default function Categories() {
  const { categories, setChangeCategory, changeCategory } = useApp();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register, getValues } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const onSubmitNewCategory = async () => {
    setIsLoading(true);
    const name: string = getValues("name").toString().trim();
    const img = getValues("img");
    if (name === "") {
      toast({
        title: "Ingrese un Nombre Valido",
        status: "error",
        duration: 1000,
        position: "top-left",
        isClosable: true,
      });
      setIsLoading(false);
      return;
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
      return;
    }
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
      setIsLoading(true);
      const response = await apiClient.post("/category", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!response.data.ok) throw new Error("err");
      toast({
        title: `${response.data.body.name} categoria creada Exitomasamente`,
        status: "success",
        duration: 2000,
        position: "top-left",
        isClosable: true,
      });
      setIsLoading(false);
      setChangeCategory(!changeCategory);
      onClose();
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
          justifyContent={"space-between"}
          alignContent={"center"}
          pb={4}
        >
          <MenuMobile />
          <Button
            onClick={onOpen}
            _hover={{ bgColor: "orange.400" }}
            bgColor={"orange.300"}
            rounded={"md"}
          >
            Crear Nueva Categoria
          </Button>
        </Flex>
      ) : (
        <Tabs position="relative" variant="unstyled">
          <TabList>
            <Button
              mb={2}
              onClick={onOpen}
              _hover={{ bgColor: "orange.400" }}
              bgColor={"orange.300"}
              rounded={"md"}
            >
              Crear Nueva Categoria
            </Button>
          </TabList>
        </Tabs>
      )}

      <Flex justifyContent={"center"}>
        <Box
          boxShadow="0px 4px 10px rgba(254, 189, 87, 0.5)" // Sombra con color rojo
          display="inline-block"
          rounded={"2xl"}
          py={2}
          px={3}
          color={"ly.700"}
        >
          <Text fontSize={"4xl"} fontWeight={"bold"} shadow={"2xl"}>
            Categorias
          </Text>
        </Box>
      </Flex>
      <Text display={"block"} textAlign={"center"} fontSize={"2xl"} my={8} color={"ly.400"}>
        Edita tus Categorias
      </Text>
      <SimpleGrid gap={1}  justifyContent={"center"} columns={[1, 1, 2, 2, 3]}>
        {categories?.map((category) => (
          <CategoryCard category={category} key={category.id} />
        ))}
      </SimpleGrid>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Crear</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form  encType="multipart/form-data">
              <Heading mb={4}>Crear Nueva Categoria</Heading>
              <FormControl>
                <FormLabel>Nombre</FormLabel>
                <Input
                  {...register("name")}
                  type="text"
                  placeholder="Tu nombre de categoria"
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
            </form>
          </ModalBody>

          <ModalFooter display={"flex"} justifyContent={"space-between"}>
            {isLoading ? (
              <Flex justifyContent={"center"} alignItems={"center"}>
                <CircularProgress isIndeterminate color="green.300" />
              </Flex>
            ) : (
              <Button
                onClick={handleSubmit(onSubmitNewCategory)}
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
