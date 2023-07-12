import useSWR from "swr";
import apiClient from "../../config/axiosClient";
import useApp from "../../hook/useApp";
import { Flex, Text, SimpleGrid } from "@chakra-ui/react";
import Producto from "../../components/Producto";
import { ProductInterface } from "../../interfaces/product";
import ModalHistory from "./ModalHistory";

interface props {
  isAdmin?: boolean;
}

export default function Home({ isAdmin = false }: props) {
  const fetcher = () => apiClient("/product").then((data) => data.data);
  const { actualCategory } = useApp();
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
      <Flex flexDirection={"column"} alignItems={"center"} my={2}>
        <Text fontSize={"4xl"} fontWeight={"bold"}>
          {actualCategory?.name}
        </Text>
        <Text fontSize={"2xl"} my={8}>
          Choose and customize your purchase here
        </Text>
        <SimpleGrid gap={4} columns={[1, 1, 2, 3, 4]}>
          {productos.map((producto: ProductInterface) => (
            <Producto producto={producto} key={producto.id} isAdmin={isAdmin} />
          ))}
        </SimpleGrid>
      </Flex>
      <ModalHistory />
    </>
  );
}
