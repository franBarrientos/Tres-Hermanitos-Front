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
          flex="1"
          px={{ base: 4, md: 8 }}
          py={{ base: 6, md: 8 }}
        >
          <Flex flexDirection={{base:"column", md:"row"}}justifyContent={"center"} alignItems={"center"}>
          <Img src="/logo.PNG"> 
          </Img>
          <Outlet />
          </Flex>
          <Footer />
        </Box>
      </Flex>
    </>
  );
}
