import {
  Card,
  Stack,
  CardBody,
  Heading,
  CardFooter,
  Button,
  Image,
  useDisclosure,
  CircularProgress,
  Flex,
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
} from "@chakra-ui/react";
import { CategoryInterface } from "../interfaces/category";
import React, { useEffect, useState } from "react";
import {
  createFormData,
  getDifferentFields,
  validateExistChangesToUpdate,
} from "../utils/validators";
import { useToastResponses } from "../hook/useToastResponses";
import { updateCategory } from "../api/category.api";
import { updateCategoriesRX } from "../helpers/subjectsRx.helper";

type props = {
  category: CategoryInterface;
};
export const CategoryCard: React.FC<props> = ({ category }) => {
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [editCategory, setEditCategory] = useState<{
    name?: string;
    img?: string | File;
  }>({ name: category.name, img: category.img });
  const { error, success, warning } = useToastResponses();
  

  useEffect(() => {
    if (!isOpen1) {
      // Si el modal se cierra, restablecer el estado con los valores originales
      setEditCategory({ name: category.name, img: category.img });
    }
  }, [isOpen1, category]);

  const handleChangeCategory = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.target.type === "file") {
      const fileInput = e.target as HTMLInputElement;
      if (fileInput?.files?.length) {
        const file = fileInput.files[0]; // Accedemos al archivo seleccionado
        setEditCategory({ ...editCategory, img: file });
      }
    } else {
      setEditCategory({ ...editCategory, [e.target.name]: e.target.value });
    }
  };

  const onSubmitEditCategory = async () => {
    setIsLoading(true);
    const formData: { name?: string; img?: string | File } = getDifferentFields(
      editCategory,
      category
    );
    if (!validateExistChangesToUpdate(formData)) {
      warning("No existen cambios por actualizar");
      setIsLoading(false);
      return;
    }

    if (formData.name === "") {
      setIsLoading(false);
      error("Agrege un nombre Valido");
      return;
    }
    const formDataa = createFormData(formData);
    try {
      const response = await updateCategory(formDataa, category.id);
      if (!response.data.ok) throw new Error("err");
      updateCategoriesRX.setSubject(true)
      success("Cambios guardados correctamente");
      onClose1();
      setIsLoading(false);
      return;
    } catch (errorFromCatch) {
      console.log(errorFromCatch);
      error("Valores invalidos", "Intente de nuevo por favor");
      setIsLoading(false);
      return;
    }
  };

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      display={"flex"}
      justifyContent={"center"}
      maxW="sm"
      boxShadow="2px 6px 10px rgb(255, 202, 204)" // Sombra con color rojo
      bg={"ly.900"}
      color={"ly.700"}
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        src={category.img}
        alt={category.name}
      />

      <Stack>
        <CardBody>
          <Heading size="md">{category.name}</Heading>
        </CardBody>

        <CardFooter>
          <Stack direction={"column"} spacing={2}>
            <Button
              onClick={() => onOpen1()}
              variant="solid"
              colorScheme="blue"
              shadow={"xl"}
            >
              Editar
            </Button>
          </Stack>
        </CardFooter>
      </Stack>
      <Modal isOpen={isOpen1} onClose={onClose1}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <Heading mb={4}>Editar Categoria</Heading>
              <FormControl>
                <FormLabel>Nombre</FormLabel>
                <Input
                  type="text"
                  name="name"
                  onChange={handleChangeCategory}
                  value={editCategory.name}
                  placeholder="Tu nombre de producto"
                  focusBorderColor="gray.600"
                  borderColor={"whiteAlpha.300"}
                  shadow={"xl"}
                  _placeholder={{ color: "gray.400" }}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Imagen</FormLabel>
                <input type="file" onChange={handleChangeCategory} name="img" />
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
                onClick={() => onSubmitEditCategory()}
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
};
