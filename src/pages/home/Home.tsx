import useSWR from "swr";
import apiClient from "../../config/axiosClient";
import useApp from "../../hook/useApp";
import {
  Flex,
  Text,
  SimpleGrid,
  Box,
  CircularProgress,
} from "@chakra-ui/react";
import Producto from "../../components/Producto";
import { ProductInterface } from "../../interfaces/product";
import ModalHistory from "./ModalHistory";

interface props {
  isAdmin?: boolean;
}

export default function Home({ isAdmin = false }: props) {
  const fetcher = () => apiClient("/product").then((data) => data.data);
  const { actualCategory, spinnerPayMercadoP } = useApp();
  const { data, isLoading } = useSWR("/product", fetcher, {
    refreshInterval: 1000,
  });
  if (isLoading) return "Cargando...";
  const productos: ProductInterface[] = data.body.filter(
    (producto: ProductInterface) => producto.category.id === actualCategory!.id
  );
  //return mientras espera los datos de axios
  return (
    <>
      <Flex
        flexDirection={"column"}
        alignItems={"center"}
        my={2}
        px={5}
        color={"ly.700"}
        position={"relative"}
      >
        <Box
          boxShadow="0px 4px 10px rgba(254, 189, 87, 0.5)" // Sombra con color rojo
          display="inline-block"
          rounded={"2xl"}
          py={2}
          px={3}
        >
          <Text fontSize={"4xl"} fontWeight={"bold"} shadow={"2xl"}>
            {actualCategory?.name}
          </Text>
        </Box>
        <Text fontSize={"2xl"} my={8} color={"ly.400"}>
          Elija y Personalize su pedido
        </Text>
        <SimpleGrid gap={5} justifyContent={"center"} columns={[1, 1, 2, 2, 3]}>
          {productos.map((producto: ProductInterface) => (
            <Producto producto={producto} key={producto.id} isAdmin={isAdmin} />
          ))}
        </SimpleGrid>
      </Flex>
      <ModalHistory />
      {spinnerPayMercadoP && (
        <CircularProgress
          isIndeterminate
          color="green.500"
          size="120px"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        />
      )}
    </>
  );
}
