import { Outlet } from "react-router-dom";
import Sidebar from "../components/SideBar";
import Resumen from "../components/Resumen";
import { Box, Flex } from "@chakra-ui/react";
import { useMediaQuery } from "react-responsive";

export default function LayoutHome() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  return (
    <>
      <Flex flexDirection={{ base: "column", md: "row" }}>
        <Sidebar />
        <Box flex={1} bg={"gray.100"} overflowY={"scroll"} p={3} h={"100vh"}>
          <Outlet />
        </Box>
        {isMobile ? null : <Resumen />}
      </Flex>
    </>
  );
}
