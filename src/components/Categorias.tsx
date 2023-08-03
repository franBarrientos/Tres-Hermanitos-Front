import { Box, Img, Text } from "@chakra-ui/react";
import useApp from "../hook/useApp";
import { CategoryInterface } from "../interfaces/category";
import { showHome } from "../helpers/subjectsRx.helper";
import { useState, useEffect } from "react";

type props = {
  category: CategoryInterface;
  isAdmin?: boolean;
  isHome?: boolean;
};

export default function Categoria({
  category,
  isAdmin = false,
  isHome = false,
}: props) {
  const [showHomeS, setShowHomeS] = useState<boolean>(true);

  useEffect(() => {
    const sub = showHome.getSubject.subscribe((data) => {
      if (data) {
        setShowHomeS(true);
      } else {
        setShowHomeS(false);
      }
    });

    return () => {
      sub.unsubscribe();
    };
  }, [showHomeS]);

  const {
    handleClickCategory,
    actualCategory,
    handleClickCategoryAdmin,
    featureAdmin,
  } = useApp();
  console.log(featureAdmin);

  return (
    <Box
      onClick={() =>
        !isHome
          ? isAdmin
            ? handleClickCategoryAdmin(category.id)
            : handleClickCategory(category.id)
          : showHome.setSubject(true)
      }
      display={"flex"}
      alignItems={"center"}
      gap={2}
      mt={2}
      color={"ly.700"}
      borderColor={"gray.100"}
      w={"full"}
      p={1}
      _hover={{ backgroundColor: "ly.300", cursor: "pointer" }}
      bgColor={
        isAdmin
          ? featureAdmin!.id === category.id
            ? "ly.300"
            : "ly.800"
          : isHome
          ? !showHomeS
            ? "ly.800"
            : "ly.300"
          : actualCategory!.id === category.id && !showHomeS
          ? "ly.300"
          : "ly.800"
      }
    >
      <Img rounded={"full"} w={"12"} height={"14"} src={category.img}></Img>
      <Text fontSize="lg" fontWeight={"semibold"}>
        {" "}
        {category.name}{" "}
      </Text>
    </Box>
  );
}
