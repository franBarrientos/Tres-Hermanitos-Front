import {
  SimpleGrid,
  Card,
  CardHeader,
  Heading,
  CardBody,
  Text,
  ListItem,
  ListIcon,
  List,
  Box,
  Flex,
  Stack,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import useSWR from "swr";
import apiClient from "../../config/axiosClient";
import { useState } from "react";
import { Paginacion } from "../../components/Paginacion";
import { formatDate } from "../../utils/dates";

export const Purchases = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoadingFetch, setIsLoadingFetch] = useState<boolean>(false);
  const fetcher = async () => {
    try {
      const response = await apiClient(`/purchase?skip=${currentPage}`);
      if (!response.data.ok) throw new Error("err");
      setTotalPages(response.data.body.totalPages);
      setIsLoadingFetch(false);
      return response.data;
    } catch (error) {
      setIsLoadingFetch(false);
      throw new Error("Err");
    }
  };

  const { data, isLoading, error } = useSWR("/purchase", fetcher, {
    refreshInterval: 1000,
  });

  if (isLoading) return <Text>Loading...</Text>;
  if (error)
    return (
      <Text color="ly.700" textAlign={"center"} fontSize={"2xl"}>
        Aun no hay ventas
      </Text>
    );

  return (
    <Box justifyContent={"center"}>
      <SimpleGrid mt={10} gap={4} columns={[1, 2, 2, 3, 5]}>
        {data.body.purchases.map((purchase: any) => {
          return (
            <Card
              minH={"md"}
              display={"flex"}
              direction={"column"}
              alignItems={"flex-start"}
              bg={"ly.900"}
              p={2}
              color={"ly.400"}
            >
              <CardHeader display={"flex"} flexDirection={"column"} gap={1}>
                <Heading size="md">
                  Cliente: {purchase.customer.user.firstName}
                </Heading>
                <Heading size="md">Dni: {purchase.customer.dni}</Heading>
                <Heading size="sm">
                  Correo: {purchase.customer.user.email}
                </Heading>
                <Heading size="md">Estado de Compra: {purchase.state == "paid" ? "Pagado" : purchase.state}</Heading>
                <Heading size="md">Pago: {purchase.payment == "MP" ? "Mercado Pago" : "Efectivo"}</Heading>
              </CardHeader>
              <CardBody>
                <Heading size="md">Productos</Heading>
                <List spacing={3} maxHeight={"64"} overflowY={"auto"}>
                  {purchase.purchasesProducts.length > 0 ? (
                    purchase.purchasesProducts.map((product: any) => {
                      return (
                        <ListItem pr={2}>
                          <Flex justifyContent={"flex-start"}>
                            <ListIcon as={CheckIcon} color="green.500" />
                            <Text color={"ly.400"}>
                              {product.product.name}
                              <span>{product.quantity} </span>
                            </Text>
                          </Flex>
                        </ListItem>
                      );
                    })
                  ) : (
                    <ListItem>
                      <ListIcon as={CheckIcon} color="green.500" />
                      Vacio
                    </ListItem>
                  )}
                </List>{" "}
              </CardBody>
              <Flex
                justifyContent={"space-between"}
                w={"full"}
                p={6}
                alignItems={"center"}
              >
                <Heading size="md">
                  Fecha: {formatDate(purchase.createdAt)}
                </Heading>
                <Stack direction={"column"} w={"full"} justifyContent={"center"}  alignItems={"center"} spacing={1}> 
                  <Heading size="md"> 💵 Total: </Heading>
                  <Heading size={"md"}> ${purchase.totalPurchase}</Heading>
                </Stack>
              </Flex>
            </Card>
          );
        })}
      </SimpleGrid>
      <Paginacion
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isLoadingFetch={isLoadingFetch}
        setIsLoadingFetch={setIsLoadingFetch}
        totalPages={totalPages}
      />
    </Box>
  );
};
