import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Box
} from "@chakra-ui/react";
import useApp from "../hook/useApp";
import ProductResumen from "./ProductResumen";
import PayButton from "./PayButton";
import { ProductInterface } from "../interfaces/product";

export default function ModalCarrito() {
  const { isOpenModal, setIsOpenModal, carrito } = useApp();

  const totalCarrito = () => {
    if (carrito)
      return carrito.reduce(
        (acc, product: ProductInterface) =>
          acc + product.price * (product.quantity ? product.quantity : 1),
        0
      );
    return 0;
  };
  return (
    <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
      <ModalOverlay />
      <ModalContent bg={"ly.800"}>
        <ModalCloseButton />
        <ModalBody my={4}>
          <Box
            boxShadow="0px 4px 10px rgba(254, 189, 87, 0.5)"
            display="inline-block"
            rounded={"2xl"}
            p={2}
            mb={5}
          >
            <Text fontSize={"4xl"} fontWeight={"bold"} color={"ly.700"}>
              🛒 Carrito
            </Text>
          </Box>
          {carrito!.length == 0 ? (
            <Text fontSize={"xl"} textAlign={"center"} fontWeight={"semibold"} color={"ly.700"}>
              Añade algo al carrito
            </Text>
          ) : (
            carrito?.map((product) => (
              <ProductResumen product={product} key={product.id} />
            ))
          )}
        </ModalBody>

        {carrito!.length > 0 && (
           <Text
           mt={8}
           fontSize={"2xl"}
           fontWeight={"bold"}
           textAlign={"center"}
           color={"ly.400"}
         >
           💵 Total: ${totalCarrito()}
         </Text>
          
        )}

        <ModalFooter>
          <Button
            colorScheme="red"
            mr={3}
            onClick={() => setIsOpenModal(false)}
          >
            Cerrar
          </Button>
          {carrito!.length > 0 && <PayButton />}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
