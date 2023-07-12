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
    const formData = getValues();

    try {
      setIsLoading(true);
      const response = await apiClient.post("/category", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!response.data.ok) throw new Error("err");
      toast({
        title: `${response.data.body.name} category created sucessfuly`,
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
        title: "Erron on Server",
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
        >
          <MenuMobile />
          <Button
            onClick={onOpen}
            _hover={{ bgColor: "orange.400" }}
            bgColor={"orange.300"}
            rounded={"md"}
          >
            Create New Category
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
              Create New Category
            </Button>
          </TabList>
        </Tabs>
      )}

      <SimpleGrid gap={4} columns={[1, 2, 2, 2, 4]}>
        {categories?.map((category) => (
          <CategoryCard category={category} key={category.id} />
        ))}
      </SimpleGrid>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <Heading mb={4}>New Category</Heading>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  {...register("name")}
                  type="text"
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
                  {...register("img")}
                  type="text"
                  placeholder="Your url image"
                  focusBorderColor="gray.600"
                  borderColor={"whiteAlpha.300"}
                  shadow={"xl"}
                  _placeholder={{ color: "gray.400" }}
                />
              </FormControl>{" "}
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
                Create
              </Button>
            )}
            <Button colorScheme="red" ml={1} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/*Modal of Create */}
    </>
  );
}
