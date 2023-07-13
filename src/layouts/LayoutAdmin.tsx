import { Outlet } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import SideBarAdmin from "../components/SideBarAdmin";

export default function LayoutAdmin() {
  return (
    <>
      <Flex flexDirection={{ base: "column", md: "row" }} bg={"ly.900"}  h={"100vh"} >
        <SideBarAdmin />
        <Box flex={1} bg={"ly.800"} overflowY={"scroll"} p={3} h={"100vh"}>
          <Outlet />
        </Box>
      </Flex>
    </>
  );
}
