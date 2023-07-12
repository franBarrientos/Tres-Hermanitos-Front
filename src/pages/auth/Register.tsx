import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
  CircularProgress,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hook/useAuth";

function Register() {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, register, getValues } = useForm();
  const { register:registerAuth } = useAuth();

  const validatePasswordAndEmail = () => {
    const email: string = getValues("email").toString().trim();
    const password: string = getValues("password").toString().trim();
    const firstName: string = getValues("firstName").toString().trim();
    const lastName: string = getValues("lastName").toString().trim();
    const city: string = getValues("city").toString().trim();
    const province: string = getValues("province").toString().trim();
    const age: string = getValues("age").toString().trim();


    if (email === "") {
      toast({
        title: "Invalid Values .",
        description: "Insert an email valid.",
        status: "error",
        duration: 1000,
        position: "top-left",
        isClosable: true,
      });
      setIsLoading(false);
      return false;
    }

    if (password === "") {
      toast({
        title: "Invalid Values .",
        description: "Ingrese a password valid.",
        status: "error",
        duration: 2000,
        position: "top-left",
        isClosable: true,
      });
      setIsLoading(false);
      return false;
    }
    if (firstName === "") {
      toast({
        title: "Invalid Values .",
        description: "Ingrese a name valid.",
        status: "error",
        duration: 2000,
        position: "top-left",
        isClosable: true,
      });
      setIsLoading(false);
      return false;
    }
    if (lastName === "") {
      toast({
        title: "Invalid Values .",
        description: "Ingrese a lastName valid.",
        status: "error",
        duration: 2000,
        position: "top-left",
        isClosable: true,
      });
      setIsLoading(false);
      return false;
    }
    if (city === "") {
      toast({
        title: "Invalid Values .",
        description: "Ingrese a city valid.",
        status: "error",
        duration: 2000,
        position: "top-left",
        isClosable: true,
      });
      setIsLoading(false);
      return false;
    }
    if (province === "") {
      toast({
        title: "Invalid Values .",
        description: "Ingrese a province valid.",
        status: "error",
        duration: 2000,
        position: "top-left",
        isClosable: true,
      });
      setIsLoading(false);
      return false;
    }
    if (age === "") {
      toast({
        title: "Invalid Values .",
        description: "Ingrese an age valid.",
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

  const onSubmit = async () => {
    setIsLoading(true);
    if (!validatePasswordAndEmail()) return;
    const formData = getValues();
    registerAuth(formData, setIsLoading)
  };

  return (
    <Box
      maxW="md"
      pb={{ base: 5, md: 10 }}
      pt={{ base: 0, md: 10 }}
      px={{ base: 8, md: 12 }}
      mb={8}
      borderRadius="md"
      boxShadow="md"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading mb={4}>Log In</Heading>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            {...register("email")}
            type="email"
            placeholder="Your Email"
            focusBorderColor="gray.600"
            borderColor={"whiteAlpha.300"}
            shadow={"xl"}
            _placeholder={{ color: "gray.400" }}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Password</FormLabel>
          <Input
            {...register("password")}
            type="password"
            placeholder="Your Password"
            focusBorderColor="gray.600"
            borderColor={"whiteAlpha.300"}
            shadow={"xl"}
            _placeholder={{ color: "gray.400" }}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Name</FormLabel>
          <Input
            {...register("firstName")}
            type="text"
            placeholder="Your name"
            focusBorderColor="gray.600"
            borderColor={"whiteAlpha.300"}
            shadow={"xl"}
            _placeholder={{ color: "gray.400" }}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Surname</FormLabel>
          <Input
            {...register("lastName")}
            type="text"
            placeholder="Your surname"
            focusBorderColor="gray.600"
            borderColor={"whiteAlpha.300"}
            shadow={"xl"}
            _placeholder={{ color: "gray.400" }}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>City</FormLabel>
          <Input
            {...register("city")}
            type="text"
            placeholder="Your city"
            focusBorderColor="gray.600"
            borderColor={"whiteAlpha.300"}
            shadow={"xl"}
            _placeholder={{ color: "gray.400" }}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Provinve</FormLabel>
          <Input
            {...register("province")}
            type="text"
            placeholder="Your province"
            focusBorderColor="gray.600"
            borderColor={"whiteAlpha.300"}
            shadow={"xl"}
            _placeholder={{ color: "gray.400" }}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Age</FormLabel>
          <Input
            {...register("age")}
            type="number"
            placeholder="Your age"
            focusBorderColor="gray.600"
            borderColor={"whiteAlpha.300"}
            shadow={"xl"}
            _placeholder={{ color: "gray.400" }}
          />
        </FormControl>
        {isLoading ? (
          <Flex mt={4} justifyContent={"center"} alignItems={"center"}>
            <CircularProgress isIndeterminate color="green.300" />
          </Flex>
        ) : (
          <Button type="submit" mt={6} colorScheme="blue" width={"full"}>
            Register
          </Button>
        )}
      </form>

      <Text mt={6} fontWeight={"semibold"} textAlign={"center"}>
        You've already hace an account?{" "}
        <Link to={"/auth/login"}>
          <Text fontSize={"lg"} fontWeight={"bold"}>
            Login
          </Text>
        </Link>
      </Text>
    </Box>
  );
}

export default Register;
