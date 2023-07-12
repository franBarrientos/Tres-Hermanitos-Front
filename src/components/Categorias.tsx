import { Box, Img, Text } from "@chakra-ui/react";
import useApp from "../hook/useApp";
import { CategoryInterface } from "../interfaces/category";

type props = {
  category: CategoryInterface;
  isAdmin?: boolean;
};

export default function Categoria({ category, isAdmin = false }: props) {
  const {
    handleClickCategory,
    actualCategory,
    handleClickCategoryAdmin,
    featureAdmin,
  } = useApp();

  return (
    <Box
      onClick={() =>
        isAdmin ? handleClickCategoryAdmin(category.id) : handleClickCategory(category.id)
      }
      display={"flex"}
      alignItems={"center"}
      gap={2}
      border={"1px"}
      mt={1}
      borderColor={"gray.100"}
      w={"full"}
      p={1}
      _hover={{ backgroundColor: "#FFC200", cursor: "pointer" }}
      bgColor={
        !isAdmin
          ? actualCategory!.id === category.id
            ? "#FFC200"
            : "white"
          : featureAdmin!.id === category.id
          ? "#FFC200"
          : "white"
      }
    >
      <Img rounded={"full"} w={"12"} src={category.img}></Img>
      <Text fontSize="lg" fontWeight={"semibold"}>
        {" "}
        {category.name}{" "}
      </Text>
    </Box>
  );
}
