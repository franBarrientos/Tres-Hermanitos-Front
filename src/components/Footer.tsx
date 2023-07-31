import { Flex, Text } from "@chakra-ui/react";
export default function Footer() {
  return (
    <Flex
      flexDirection={"column"}
      color={"ly.700"}
      fontWeight="semibold"
      align="center"
      justify="center"
      pb={"20"}
    >
      <Text fontSize="sm" mr={2}>
        Todos los derechos reservados a Barrientos Franco 2023
      </Text>
    </Flex>
  );
}
