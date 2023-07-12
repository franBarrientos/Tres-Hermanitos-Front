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
  useToast,
} from "@chakra-ui/react";
import { CategoryInterface } from "../interfaces/category";
import React, { useState } from "react";
import apiClient from "../config/axiosClient";
import useApp from "../hook/useApp";

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
  const [editCategory, setEditCategory] = useState<CategoryInterface>(category);
  const toast = useToast();

  const { setChangeCategory, changeCategory } = useApp();

  const handleChangeCategory = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setEditCategory({ ...editCategory, [e.target.name]: e.target.value });
  };

  function getDifferentFields(object1: any, object2: any) {
    const result = Object.entries(object1).reduce((acc, [key, value]) => {
      if (object2[key] !== value) {
        return { ...acc, [key]: value };
      }
      return acc;
    }, {});

    return result;
  }

  const onSubmitEditCategory = async () => {
    setIsLoading(true);
    const formData: { name?: string; img?: string } = getDifferentFields(
      editCategory,
      category
    );
    try {
      const response = await apiClient.put(
        `/category/${category.id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (!response.data.ok) throw new Error("err");
      setChangeCategory(!changeCategory);
      toast({
        title: "Changes Saved Successfuly",
        status: "success",
        duration: 2000,
        position: "top-left",
        isClosable: true,
      });
      onClose1();
      setIsLoading(false);
      return;
    } catch (error) {
      toast({
        title: "Invalid Values .",
        description: "Ingrese a price valid.",
        status: "error",
        duration: 2000,
        position: "top-left",
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }
  };

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      display={"flex"}
      justifyContent={"center"}
      maxWidth={"96"}
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
              variant="ghost"
              colorScheme="blue"
              shadow={"xl"}
            >
              Edit
            </Button>
            <Button variant="ghost" colorScheme="red" shadow={"xl"}>
              Delete
            </Button>
          </Stack>
        </CardFooter>
      </Stack>
      <Modal isOpen={isOpen1} onClose={onClose1}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <Heading mb={4}>Edit Product</Heading>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  onChange={handleChangeCategory}
                  value={editCategory.name}
                  placeholder="Your product name"
                  focusBorderColor="gray.600"
                  borderColor={"whiteAlpha.300"}
                  shadow={"xl"}
                  _placeholder={{ color: "gray.400" }}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Image</FormLabel>
                <Input
                  type="text"
                  name="img"
                  onChange={handleChangeCategory}
                  value={editCategory.img}
                  placeholder="Your image"
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
                onClick={() => onSubmitEditCategory()}
                type="submit"
                colorScheme="blue"
                width={"full"}
              >
                Save changes
              </Button>
            )}
            <Button colorScheme="red" ml={1} onClick={onClose1}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
};
