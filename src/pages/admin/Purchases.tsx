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
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import useSWR from "swr";
import apiClient from "../../config/axiosClient";

export const Purchases = () => {
  const fetcher = async () => {
    try {
      const response = await apiClient("/purchase");
      if (!response.data.ok) throw new Error("err");
      return response.data;
    } catch (error) {
      throw new Error("Err");
    }
  };

  const { data, isLoading, error } = useSWR("/purchase", fetcher, {
    refreshInterval: 1000,
  });

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text color="ly.700" textAlign={"center"} fontSize={"2xl"}>Aun no hay ventas</Text>;

  return (
    <SimpleGrid
      mt={10}
      gap={4}
      templateColumns="repeat(auto-fit, minmax(200px, 1fr))"
    >
      {data.body.map((purchase: any) => {
        return (
          <Card
            minH={"md"}
            display={"flex"}
            direction={"column"}
            justifyContent={"space-between"}
            alignItems={"center"}
            bg={"ly.900"}
            color={"ly.700"}
          >
            <CardHeader display={"flex"} flexDirection={"column"} gap={1}>
              <Heading size="md">Dni Cliente: {purchase.customer.dni}</Heading>
              <Heading size="md">Estado Compra: {purchase.state}</Heading>
              <Heading size="md">Pago: {purchase.payment}</Heading>
            </CardHeader>
            <CardBody>
              <List spacing={3} maxHeight={60} overflowY={"scroll"}>
                {purchase.purchasesProducts.length > 0 ? (
                  purchase.purchasesProducts.map((product: any) => {
                    return (
                      <ListItem>
                        <ListIcon as={CheckIcon} color="green.500" />
                        <Text color={"ly.400"}>{product.product.name}</Text>
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
              <Heading textAlign={"center"} mt={3} size="md">
                💵 Total: {purchase.totalPurchase}
              </Heading>
            </CardBody>
          </Card>
        );
      })}
    </SimpleGrid>
  );
};
