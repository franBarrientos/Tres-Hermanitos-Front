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
import { GoogleLogin } from "@react-oauth/google";
import apiClient from "../../config/axiosClient";

function App() {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, register, getValues } = useForm();
  const { login } = useAuth();
  /* "firstName":"fran",
"lastName":"barrientos",
	"password":"123",	
	"email":"correo1@correo.com",
		"city": "corrientes",
	"role":"ADMIN",
	"province":"tucuman",
	"age":19 
  */

  const handleGoogleLoginSuccess = async (response: any) => {
    try {
      const responseBackend = await apiClient.post("/google", response);
      login(null, null, responseBackend)
    
    } catch (error) {
      console.log(error)
      toast({
        title: "Error on Google Sign",
        status: "error",
        duration: 1000,
        position: "top-left",
        isClosable: true,
      });
    }
    // Aquí puedes manejar la respuesta exitosa del inicio de sesión de Google
  };
  const handleGoogleLoginError = () => {
    toast({
      title: "Error on Google Sign",
      status: "error",
      duration: 1000,
      position: "top-left",
      isClosable: true,
    });
    // Aquí puedes manejar la respuesta exitosa del inicio de sesión de Google
  };

  const validatePasswordAndEmail = () => {
    const email: string = getValues("email").toString().trim();
    const password: string = getValues("password").toString().trim();

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

    return true;
  };

  const onSubmit = async () => {
    setIsLoading(true);
    if (!validatePasswordAndEmail()) return;
    const formData = getValues();
    login(formData, setIsLoading);
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
      <Heading mb={4}>Log In</Heading>
      <GoogleLogin
        onSuccess={handleGoogleLoginSuccess}
        onError={handleGoogleLoginError}
      />
      {/*    <Button onClick={() => infoUser()}>
        
      </Button> */}

      <form onSubmit={handleSubmit(onSubmit)}>
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
        {isLoading ? (
          <Flex mt={4} justifyContent={"center"} alignItems={"center"}>
            <CircularProgress isIndeterminate color="green.300" />
          </Flex>
        ) : (
          <Button type="submit" mt={6} colorScheme="blue" width={"full"}>
            Iniciar sesión
          </Button>
        )}
      </form>

      <Text mt={6} fontWeight={"semibold"} textAlign={"center"}>
        Don't have an account yet?{" "}
        <Link to={"/auth/register"}>
          <Text fontSize={"lg"} fontWeight={"bold"}>
            Create one
          </Text>
        </Link>
      </Text>
    </Box>
  );
}

export default App;
