import {
  Card,
  Stack,
  CardBody,
  Heading,
  Text,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import { PurchaseInterface } from "../../interfaces/purchase";
import { ProductInterface } from "../../interfaces/product";

export const CardHistory: React.FC<PurchaseInterface> = ({
  payment,
  state,
  id,
  purchasesProducts,
}) => {
  return (
    <>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <Stack>
          <CardBody>
            <Heading size="md">Nro Buy: {id}</Heading>
            <Heading size="md">State: {state}</Heading>
            <Heading size="md">Products: </Heading>
            <UnorderedList>
              {purchasesProducts?.map((purchase) => {
                return (
                  <Stack key={purchase.id} bg={"gray.200"} rounded={"xl"} p={1} direction={"column"} spacing={1}>
                    <ListItem>{(purchase.product as ProductInterface).name}</ListItem>
                    <Text>Quantity: {purchase.quantity}</Text>
                  </Stack>
                );
              })}
            </UnorderedList>
            <Heading size="md">Payment: {payment}</Heading>
          </CardBody>
        </Stack>
      </Card>
    </>
  );
};
