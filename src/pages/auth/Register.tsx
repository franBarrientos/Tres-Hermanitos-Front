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
import { useToastResponses } from "../../hook/useToastResponses";

function Register() {
  const { error } = useToastResponses();
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, register, getValues } = useForm();
  const { register: registerAuth } = useAuth();

  const validatePasswordAndEmail = () => {
    const email: string = getValues("email").toString().trim();
    const password: string = getValues("password").toString().trim();
    const firstName: string = getValues("firstName").toString().trim();
    const lastName: string = getValues("lastName").toString().trim();
    const city: string = getValues("city").toString().trim();
    const province: string = getValues("province").toString().trim();
    const age: string = getValues("age").toString().trim();

    if (email === "") {
      error("Invalid Values", "Ingrese un email valido");
      setIsLoading(false);
      return false;
    }

    if (password === "") {
      error("Invalid Values", "Ingrese una contraseña valida");
      setIsLoading(false);
      return false;
    }
    if (firstName === "") {
      error("Invalid Values", "Ingrese un nombre valido");
      setIsLoading(false);
      return false;
    }
    if (lastName === "") {
      error("Invalid Values", "Ingrese un apellido valido");
      setIsLoading(false);
      return false;
    }
    if (city === "") {
      error("Invalid Values", "Ingrese una ciudad valida");
      setIsLoading(false);
      return false;
    }
    if (province === "") {
      error("Invalid Values", "Ingrese una provincia valida");
      setIsLoading(false);
      return false;
    }
    if (age === "") {
      error("Invalid Values", "Ingrese una edad valida");
      setIsLoading(false);
      return false;
    }
    return true;
  };

  const onSubmit = async () => {
    setIsLoading(true);
    if (!validatePasswordAndEmail()) return;
    const formData = getValues();
    registerAuth(formData, setIsLoading);
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
      bg={"ly.800"}
      color={"ly.700"}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading mb={4}>Registrarme</Heading>
        <FormControl>
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
        <FormControl mt={4}>
          <FormLabel>Nombre</FormLabel>
          <Input
            {...register("firstName")}
            type="text"
            placeholder="Tu nombre"
            focusBorderColor="gray.600"
            borderColor={"whiteAlpha.300"}
            shadow={"xl"}
             bg="white"
            _placeholder={{ color: "gray.400" }}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Apellido</FormLabel>
          <Input
            {...register("lastName")}
            type="text"
            placeholder="Tu apellido"
            focusBorderColor="gray.600"
            borderColor={"whiteAlpha.300"}
            shadow={"xl"}
             bg="white"
            _placeholder={{ color: "gray.400" }}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Ciudad</FormLabel>
          <Input
            {...register("city")}
            type="text"
            placeholder="Tu ciudad"
            focusBorderColor="gray.600"
            borderColor={"whiteAlpha.300"}
            shadow={"xl"}
             bg="white"
            _placeholder={{ color: "gray.400" }}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Provincia</FormLabel>
          <Input
            {...register("province")}
            type="text"
            placeholder="Tu provincia"
            focusBorderColor="gray.600"
            borderColor={"whiteAlpha.300"}
            shadow={"xl"}
             bg="white"
            _placeholder={{ color: "gray.400" }}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Edad</FormLabel>
          <Input
            {...register("age")}
            type="number"
            placeholder="Tu edad"
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
            Registrarme
          </Button>
        )}
      </form>

      <Text mt={6} fontWeight={"semibold"} textAlign={"center"}>
        Ya tienes una cuenta?{" "}
        <Link to={"/auth/login"}>
          <Text fontSize={"lg"} fontWeight={"bold"}>
            Iniciar Sesion
          </Text>
        </Link>
      </Text>
    </Box>
  );
}

export default Register;
