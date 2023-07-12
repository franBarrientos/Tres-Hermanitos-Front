import {
  Card,
  Text,
  Image,
  CardBody,
  Heading,
  Stack,
  CardFooter,
  Button,
  Box,
} from "@chakra-ui/react";
import { ProductInterface } from "../interfaces/product";
import useApp from "../hook/useApp";

export default function ProductResumen(props: { product: ProductInterface }) {
  const { handleRemoveProductFromCarrito } = useApp();
  return (
    <Card
      w={"52"}
      direction={{ base: "row", md: "column" }}
      display={"flex"}
      alignItems={"center"}
      mt={1}
    >
      <Image
        objectFit="cover"
        w={{ base: 60, md: 80 }}
        width={{ base: 56 }}
        src={props.product.img}
        alt={props.product.name}
      />

      <Stack>
        <CardBody>
          <Heading size="md">{props.product.name}</Heading>

          <Text py="2">{props.product.description}</Text>
        </CardBody>

        <CardFooter
          display={"flex"}
          flexDirection={{ base: "column", md: "row" }}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Button px={0} mx={1} variant="solid" colorScheme="purple">
            {props.product.quantity}
          </Button>
          <Box my={{ base: 1, md: 0 }} display={"flex"}>
            <Button px={2} variant="solid" colorScheme="blue">
              ${props.product.price}
            </Button>
            <Button
              onClick={() => handleRemoveProductFromCarrito(props.product.id)}
              px={1}
              ml={1}
              variant="solid"
              w={"20"}
              colorScheme="red"
            >
              Remove
            </Button>
          </Box>
        </CardFooter>
      </Stack>
    </Card>
  );
}
