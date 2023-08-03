import { Outlet } from "react-router-dom";
import { Box, Flex, Img } from "@chakra-ui/react";
import Footer from "../components/Footer";
export default function LayoutAuthenticate() {
  return (
    <>
      <Flex direction="column" minH="100vh">
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-evenly"}
          bg={"ly.900"}
          flex="1"
          px={{ base: 4, md: 8 }}
          py={{ base: 3, md: 8 }}
        >
          <Flex
            flexDirection={{ base: "column", md: "row" }}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Img
              src="/logo.webp"
              w={{ base: "auto", sm: "35%", xl: "20%" }}
              h={"auto"}
            ></Img>
            <Outlet />
          </Flex>
          <Footer />
        </Box>
      </Flex>
    </>
  );
}
