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

  const { data, isLoading } = useSWR("/purchase", fetcher, {
    refreshInterval: 1000,
  });

  if (isLoading) return <Text>Loading...</Text>;

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
          >
            <CardHeader display={"flex"} flexDirection={"column"} gap={1}>
              <Heading size="md">Dni Client: {purchase.customer.dni}</Heading>
              <Heading size="md">State: {purchase.state}</Heading>
              <Heading size="md">Payment: {purchase.payment}</Heading>
            </CardHeader>
            <CardBody>
              <List spacing={3} maxHeight={60} overflowY={"scroll"}>
                {purchase.purchasesProducts.length > 0 ? (
                  purchase.purchasesProducts.map((product: any) => {
                    return (
                      <ListItem>
                        <ListIcon as={CheckIcon} color="green.500" />
                        {product.product.name}
                      </ListItem>
                    );
                  })
                ) : (
                  <ListItem>
                    <ListIcon as={CheckIcon} color="green.500" />
                    Empty
                  </ListItem>
                )}
              </List>{" "}
              <Heading textAlign={"center"} mt={3} size="md">
                💶 Total: {purchase.totalPurchase}
              </Heading>
            </CardBody>
          </Card>
        );
      })}
    </SimpleGrid>
  );
};
