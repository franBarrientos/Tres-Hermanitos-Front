import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
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
      <ModalContent>
        <ModalCloseButton />
        <ModalBody my={4}>
          <Text
            fontSize={"2xl"}
            textAlign={"center"}
            fontWeight={"bold"}
            mb={10}
          >
            Shopping cart
          </Text>
          {carrito!.length == 0 ? (
            <Text fontSize={"xl"} textAlign={"center"} fontWeight={"semibold"}>
              Add something to the cart
            </Text>
          ) : (
            carrito?.map((product) => (
              <ProductResumen product={product} key={product.id} />
            ))
          )}
        </ModalBody>

        {carrito!.length > 0 && (
          <Text textAlign={"center"} mt={8} fontSize={"2xl"} fontWeight={"bold"}>
            Total: ${totalCarrito()}
          </Text>
        )}

        <ModalFooter>
          <Button
            colorScheme="red"
            mr={3}
            onClick={() => setIsOpenModal(false)}
          >
            Close
          </Button>
          {carrito!.length > 0 && (
            <PayButton />
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
