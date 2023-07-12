import { Box, Text } from "@chakra-ui/react";
import { useMediaQuery } from "react-responsive";
import useApp from "../hook/useApp";
import ProductResumen from "./ProductResumen";
import PayButton from "./PayButton";

export default function Resumen() {
  const { carrito, totalCarrito } = useApp();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return isMobile ? null : (
    <Box
      h="100vh"
      w={{ lg: "72", md: "56" }}
      p={5}
      overflowY={"scroll"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <Text fontSize={"2xl"} textAlign={"center"} fontWeight={"bold"} mb={10}>
        Shopping cart
      </Text>
      {carrito!.length == 0 ? (
        <Text fontSize={"xl"} textAlign={"center"} fontWeight={"semibold"}>
          Add something to the cart
        </Text>
      ) : (
        <Box>
          {carrito?.map((product) => (
            <ProductResumen product={product} key={product.id} />
          ))}
          <Text mt={8} fontSize={"2xl"} fontWeight={"bold"}>
            💶Total: ${totalCarrito()}
          </Text>
          <PayButton />
        </Box>
      )}
    </Box>
  );
}
