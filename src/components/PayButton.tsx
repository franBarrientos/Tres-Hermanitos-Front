import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
  CircularProgress,
  Flex,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Img,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import useApp from "../hook/useApp";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import apiClient from "../config/axiosClient";

export default function PayButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();
  const toast = useToast();
  const cancelRef = React.useRef(null);
  const cancelRef1 = React.useRef(null);
  const cancelRef2 = React.useRef(null);
  const { user, setUser, pay } = useApp();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, register, getValues } = useForm();
  const {
    handleSubmit: handleSubmit1,
    register: register1,
    getValues: getValues1,
  } = useForm();
  const [payment, setPayment] = useState<"MP" | "CASH">("MP");

  const onSubmit = async () => {
    setIsLoading(true);
    const formData = getValues();
    if (
      formData.addres &&
      formData.addres.length > 3 &&
      formData.dni &&
      formData.dni.length == 8 &&
      (formData.dni = Number(formData.dni))
    ) {
      try {
        const response = await apiClient.post(
          "/customer",
          {
            ...formData,
            user: user?.id,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.ok) {
          setUser({ ...user!, customer: response.data.body });
          localStorage.setItem(
            "user",
            JSON.stringify({ ...user!, customer: response.data.body })
          );
          setIsLoading(false);
          pay(payment, Number(response.data.body.id));
        } else {
          throw new Error("Coudn't create customer");
        }
      } catch (error) {
        toast({
          title: "Error de servidor",
          status: "error",
          duration: 1000,
          position: "top-left",
          isClosable: true,
        });
        setIsLoading(false);
        return;
      }
    } else {
      toast({
        title: "Valores Incorrectos",
        status: "error",
        duration: 1000,
        position: "top-left",
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }
  };

  const onSubmitPayment = () => {
    if (user && user.customer) pay(payment, Number(user.customer.id));
    onClose2();
  };

  const validatePasswordAndEmail = () => {
    const email: string = getValues1("email").toString().trim();
    const password: string = getValues1("password").toString().trim();
    if (email === "") {
      toast({
        title: "Ingrese un email valido",
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
        title: "Ingrese una contraseña valida",
        status: "error",
        duration: 1000,
        position: "top-left",
        isClosable: true,
      });
      setIsLoading(false);
      return false;
    }
    return true;
  };


  
  const onSubmitWithoutAccount = async () => {
    setIsLoading(true);
    if (!validatePasswordAndEmail()) return;
    const formData = getValues1();
    console.log(formData)
      try {
        const response = await apiClient.post("/users", {
          ...formData,
        });
        const { data } = response;
        if (data.ok == true) {
          localStorage.setItem("token", data.body.token);
          localStorage.setItem("user", data.body.user);
          setUser(data.body.user);
          setIsLoading(false);
        }
        onOpen1()
      } catch (errorFromCatch) {
        console.log(errorFromCatch);
        setIsLoading(false);
        toast({
          title: "Ya tienes una cuenta por favor ingrese con su cuenta..",
          status: "warning",
          duration: 1500,
          position: "top-left",
          isClosable: true,
        });
        navigate("/auth/login");
      }
      onClose()
    };
  

  return (
    <>
      <Button
        onClick={() => {
          if (!user) {
            onOpen();
            return;
          }
          if (!user.customer) {
            onOpen1();
            return;
          }
          onOpen2();
          return;
        }}
        my={5}
        p={5}
        bg={"ly.700"}
        _hover={{ backgroundColor: "blue.500", cursor: "pointer" }}
        color="white"
        fontWeight={"semibold"}
        variant="outline"
      >
        Confirmar pedido
      </Button>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        motionPreset="slideInBottom"
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>
            Ingrese los siguiente datos para confirmar orden
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <form>
              <FormControl>
                <FormLabel>Nombre y Apellido</FormLabel>
                <Input
                  {...register1("firstName")}
                  type="text"
                  placeholder="Tu Nombre y apellido"
                  focusBorderColor="gray.600"
                  borderColor={"whiteAlpha.300"}
                  shadow={"xl"}
                  _placeholder={{ color: "gray.400" }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  {...register1("email")}
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
                  {...register1("password")}
                  type="password"
                  placeholder="Tu Contraseña"
                  focusBorderColor="gray.600"
                  borderColor={"whiteAlpha.300"}
                  shadow={"xl"}
                  bg="white"
                  _placeholder={{ color: "gray.400" }}
                />
              </FormControl>
            </form>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={onClose}>No</Button>
            <Button
              onClick={handleSubmit1(onSubmitWithoutAccount)}
              colorScheme="blue"
              ml={3}
            >
              Confirmar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        leastDestructiveRef={cancelRef1}
        motionPreset="slideInBottom"
        onClose={onClose1}
        isOpen={isOpen1}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Ingresa los siguientes Datos</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <FormLabel>Direccion</FormLabel>
                <Input
                  {...register("addres")}
                  type="text"
                  placeholder="Tu direccion"
                  focusBorderColor="gray.600"
                  borderColor={"whiteAlpha.300"}
                  shadow={"xl"}
                  _placeholder={{ color: "gray.400" }}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Dni</FormLabel>
                <Input
                  {...register("dni")}
                  type="number"
                  placeholder="Tu dni"
                  focusBorderColor="gray.600"
                  borderColor={"whiteAlpha.300"}
                  shadow={"xl"}
                  _placeholder={{ color: "gray.400" }}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormControl mb={6}>
                  <FormLabel>Metodo de Pago</FormLabel>
                  <Flex gap={2} alignItems={"center"}>
                    <Button
                      type="button"
                      variant={payment === "MP" ? "solid" : "outline"}
                      colorScheme={payment === "MP" ? "blue" : "gray"}
                      onClick={() => setPayment("MP")}
                    >
                      <Img
                        rounded={"xl"}
                        w={45}
                        h={38}
                        src="https://play-lh.googleusercontent.com/YCT9pYI8KOkOuvVtAkB8103BektOn973BW-t4srwhSMbpj0HUVQf10hVusFpmTTbHg"
                      ></Img>

                      <Text ml={3}> Mercado Pago</Text>
                    </Button>

                    <Button
                      type="button"
                      variant={payment === "CASH" ? "solid" : "outline"}
                      colorScheme={payment === "CASH" ? "blue" : "gray"}
                      onClick={() => setPayment("CASH")}
                    >
                      <Flex direction={"column"}>
                        <Text>💵 Efectivo</Text>
                        <Text> Al recibir el pedido</Text>
                      </Flex>
                    </Button>
                  </Flex>
                </FormControl>
              </FormControl>
              {isLoading ? (
                <Flex mt={4} justifyContent={"center"} alignItems={"center"}>
                  <CircularProgress isIndeterminate color="green.300" />
                </Flex>
              ) : (
                <Flex gap={2}>
                  <Button type="submit" colorScheme="blue" width={"full"}>
                    Confirmar
                  </Button>
                  <Button colorScheme="red" onClick={onClose1}>
                    Cerrar
                  </Button>
                </Flex>
              )}
            </form>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog
        leastDestructiveRef={cancelRef2}
        motionPreset="slideInBottom"
        onClose={onClose2}
        isOpen={isOpen2}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Ingresa los siguientes Datos</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <form onSubmit={handleSubmit(onSubmitPayment)}>
              <FormControl mb={6}>
                <FormLabel>Metodo de Pago</FormLabel>
                <Flex gap={2} alignItems={"center"}>
                  <Button
                    type="button"
                    variant={payment === "MP" ? "solid" : "outline"}
                    colorScheme={payment === "MP" ? "blue" : "gray"}
                    onClick={() => setPayment("MP")}
                  >
                    <Img
                      rounded={"xl"}
                      w={45}
                      h={38}
                      src="https://play-lh.googleusercontent.com/YCT9pYI8KOkOuvVtAkB8103BektOn973BW-t4srwhSMbpj0HUVQf10hVusFpmTTbHg"
                    ></Img>

                    <Text ml={3}> Mercado Pago</Text>
                  </Button>

                  <Button
                    type="button"
                    variant={payment === "CASH" ? "solid" : "outline"}
                    colorScheme={payment === "CASH" ? "blue" : "gray"}
                    onClick={() => setPayment("CASH")}
                  >
                    <Flex direction={"column"}>
                      <Text>💵 Efectivo</Text>
                      <Text> Al recibir el pedido</Text>
                    </Flex>{" "}
                  </Button>
                </Flex>
              </FormControl>

              {isLoading ? (
                <Flex mt={4} justifyContent={"center"} alignItems={"center"}>
                  <CircularProgress isIndeterminate color="green.300" />
                </Flex>
              ) : (
                <Flex alignItems={"center"} gap={3}>
                  <Button type="submit" colorScheme="blue" width={"full"}>
                    Confirmar
                  </Button>
                  <Button colorScheme="red" onClick={onClose2}>
                    Cerrar
                  </Button>
                </Flex>
              )}
            </form>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
