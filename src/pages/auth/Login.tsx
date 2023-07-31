import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  CircularProgress,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hook/useAuth";
import { GoogleLogin } from "@react-oauth/google";
import apiClient from "../../config/axiosClient";
import { useToastResponses } from "../../hook/useToastResponses";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, register, getValues } = useForm();
  const { login } = useAuth();
  const { error } = useToastResponses();

  const handleGoogleLoginSuccess = async (response: any) => {
    try {
      const responseBackend = await apiClient.post("/google", response);
      login(null, null, responseBackend);
    } catch (errorFromCatch) {
      console.log(error);
      error("Error on Google Sign");
    }
  };
  const handleGoogleLoginError = () => {
    error("Error on Google Sign");
  };

  const validatePasswordAndEmail = () => {
    const email: string = getValues("email").toString().trim();
    const password: string = getValues("password").toString().trim();

    if (email === "") {
      error("Valores Invalidos", "Ingrese un email"), setIsLoading(false);
      return false;
    }

    if (password === "") {
      error("Valores Invalidos", "Ingrese una contraseña valida");
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
      pt={{ base: 5, md: 10 }}
      px={{ base: 8, md: 12 }}
      mb={8}
      bg={"ly.800"}
      color={"ly.700"}
      borderRadius="md"
      boxShadow="md"
    >
      <Heading mb={4}>Iniciar Sesion</Heading>
      <GoogleLogin
        onSuccess={handleGoogleLoginSuccess}
        onError={handleGoogleLoginError}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mt={2}>
          <FormLabel>Email</FormLabel>
          <Input
            {...register("email")}
            type="email"
            placeholder="Tu Email"
            focusBorderColor="gray.600"
            borderColor={"whiteAlpha.300"}
            shadow={"xl"}
            bg="white"
            _placeholder={{ color: "gray.400" }}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Contraseña</FormLabel>
          <Input
            {...register("password")}
            type="password"
            placeholder="Tu Contraseña"
            focusBorderColor="gray.600"
            borderColor={"whiteAlpha.300"}
            shadow={"xl"}
            bg="white"
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
        No tienes una cuenta?{" "}
        <Link to={"/auth/register"}>
          <Text fontSize={"lg"} fontWeight={"bold"}>
            Crear Una
          </Text>
        </Link>
      </Text>
    </Box>
  );
}

export default App;
