import { Outlet } from "react-router-dom";
import Sidebar from "../components/SideBar";
import Resumen from "../components/Resumen";
import { Box, Flex } from "@chakra-ui/react";
import { useMediaQuery } from "react-responsive";
import "../utils/stylesScroll.css";
import { useEffect, useState } from "react";
import { showHome } from "../helpers/subjectsRx.helper";
import HomePrincipal from "../pages/home/HomePrincipal";
export default function LayoutHome() {
  const [showHomeS, setShowHomeS] = useState<boolean>(true);

  useEffect(() => {
    const sub = showHome.getSubject.subscribe((data) => {
      if (data) {
        setShowHomeS(true);
      }else{
        setShowHomeS(false);
      }
    });

    return () => {
      sub.unsubscribe();
    };
  }, [showHomeS]);

  const isMobile = useMediaQuery({ maxWidth: 768 });
  return (
    <>
      <Flex
        flexDirection={{ base: "column", md: "row" }}
        bg={"ly.900"}
        h={"100vh"}
      >
        <Sidebar />
        <Box flex={1} bg={"ly.800"} overflowY={"auto"} p={0} h={"100vh"}>
          <Flex justifyContent={"center"} alignItems={"center"} p={1} bg={"ly.300"} mb={1}> 
              Compra minima $5.000 Envio gratis
          </Flex>
          {showHomeS ? <HomePrincipal /> : <Outlet />}
        </Box>
        {isMobile ? null : <Resumen />}
      </Flex>
    </>
  );
}
