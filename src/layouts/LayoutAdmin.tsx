import { Outlet, useNavigate } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import SideBarAdmin from "../components/SideBarAdmin";
import useApp from "../hook/useApp";

export default function LayoutAdmin() {
  const { user } = useApp();
  const navigate = useNavigate();
  if (!user || user.role != "ADMIN" || !localStorage.getItem("token")) navigate("/");
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
