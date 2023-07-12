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
        const response = await apiClient.post("/customer", {
          ...formData,
          user: user?.id,
        });

        if (response.data.ok) {
          setIsLoading(false);
          pay(payment, Number(response.data.body.id));
          setUser({ ...user!, customer: response.data.body });
        } else {
          throw new Error("Coudn't create customer");
        }
      } catch (error) {
        toast({
          title: "Error of Server sorry.. .",
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
        title: "Invalid Values .",
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
        backgroundColor="blue.500"
        color="white"
        fontWeight={"semibold"}
        variant="outline"
      >
        Pay
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
          <AlertDialogHeader>You must Log in to buy</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>To buy something log in before</AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={onClose}>No</Button>
            <Button
              onClick={() => navigate("/auth/login")}
              colorScheme="blue"
              ml={3}
            >
              Log In
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
          <AlertDialogHeader>You must insert these data</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <FormLabel>Addres</FormLabel>
                <Input
                  {...register("addres")}
                  type="text"
                  placeholder="Your addres"
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
                  placeholder="Your dni"
                  focusBorderColor="gray.600"
                  borderColor={"whiteAlpha.300"}
                  shadow={"xl"}
                  _placeholder={{ color: "gray.400" }}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormControl mb={6}>
                  <FormLabel>Payment</FormLabel>
                  <Flex gap={2} alignItems={"center"}>
                    <Button
                      type="button"
                      variant={payment === "MP" ? "solid" : "outline"}
                      colorScheme={payment === "MP" ? "blue" : "gray"}
                      onClick={() => setPayment("MP")}
                    >
                      <Img
                        rounded={"xl"}
                        w={"48"}
                        h={9}
                        src="/mercadopago.jpg"
                      ></Img>
                    </Button>

                    <Button
                      type="button"
                      variant={payment === "CASH" ? "solid" : "outline"}
                      colorScheme={payment === "CASH" ? "blue" : "gray"}
                      onClick={() => setPayment("CASH")}
                    >
                      💵 CASH
                    </Button>
                  </Flex>
                </FormControl>
              </FormControl>
              {isLoading ? (
                <Flex mt={4} justifyContent={"center"} alignItems={"center"}>
                  <CircularProgress isIndeterminate color="green.300" />
                </Flex>
              ) : (
                <Button type="submit" mt={6} colorScheme="blue" width={"full"}>
                  Save
                </Button>
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
          <AlertDialogHeader>You must insert these data</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <form onSubmit={handleSubmit(onSubmitPayment)}>
              <FormControl mb={6}>
                <FormLabel>Payment</FormLabel>
                <Flex gap={2} alignItems={"center"}>
                  <Button
                    type="button"
                    variant={payment === "MP" ? "solid" : "outline"}
                    colorScheme={payment === "MP" ? "blue" : "gray"}
                    onClick={() => setPayment("MP")}
                  >
                    <Img
                      rounded={"xl"}
                      w={"48"}
                      h={9}
                      src="/mercadopago.jpg"
                    ></Img>
                  </Button>

                  <Button
                    type="button"
                    variant={payment === "CASH" ? "solid" : "outline"}
                    colorScheme={payment === "CASH" ? "blue" : "gray"}
                    onClick={() => setPayment("CASH")}
                  >
                    💵 CASH
                  </Button>
                </Flex>
              </FormControl>

              {isLoading ? (
                <Flex mt={4} justifyContent={"center"} alignItems={"center"}>
                  <CircularProgress isIndeterminate color="green.300" />
                </Flex>
              ) : (
                <Button type="submit" mt={6} colorScheme="blue" width={"full"}>
                  Confirm Purchase
                </Button>
              )}
            </form>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
