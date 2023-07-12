import { Outlet } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import SideBarAdmin from "../components/SideBarAdmin";

export default function LayoutAdmin() {
  return (
    <>
      <Flex flexDirection={{ base: "column", md: "row" }}>
        <SideBarAdmin />
        <Box flex={1} bg={"gray.100"} overflowY={"scroll"} p={3} h={"100vh"}>
          <Outlet />
        </Box>
      </Flex>
    </>
  );
}
