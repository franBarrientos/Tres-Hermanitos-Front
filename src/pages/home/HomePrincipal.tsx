import { Box, Flex, SimpleGrid, Text, Heading } from "@chakra-ui/react";
import Carousel from "../../components/Carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruckFast,
  faCreditCard,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";
import { SearchProductButton } from "../../components/SearchProductButton";
import CarouselProducts from "../../components/CarouselProducts";
import useApp from "../../hook/useApp";
import { InstagramButton } from "../../components/InstagramButton";
import WhatsappButton from "../../components/WhatsappButton";
import ModalHistory from "./ModalHistory";

// Ahora puedes usar el icono 'faTruck' en tu código
export default function HomePrincipal() {
  const {handleClickCategory, categories} = useApp()
  const isMobile = useMediaQuery({
    maxWidth: 1228,
  });

  return (
    <>
      <SearchProductButton />
      <Carousel />
      {isMobile ? (
        <Box
          my={3}
          w={"full"}
          h={"80px"}
          display={"flex"}
          justifyContent={"center"}
          bg={"ly.300"}
        >
          <Flex gap={3} color={"ly.700"} alignItems={"center"}>
            <FontAwesomeIcon size="2xl" icon={faTruckFast} />
            <Flex direction={"column"} justifyContent={"center"}>
              <Text fontWeight={"semibold"}>Envíos a todo el país</Text>
              <Text>Llegamos a donde estés vos</Text>
            </Flex>
          </Flex>
        </Box>
      ) : (
        <Box
          display={"flex"}
          justifyContent={"space-evenly"}
          my={3}
          w={"full"}
          h={"80px"}
          bg={"ly.300"}
        >
          <Flex gap={3} color={"ly.700"} alignItems={"center"}>
            <FontAwesomeIcon size="2xl" icon={faTruckFast} />
            <Flex direction={"column"} justifyContent={"center"}>
              <Text fontWeight={"semibold"}>Envíos a todo el país</Text>
              <Text>Llegamos a donde estés vos</Text>
            </Flex>
          </Flex>
          <Flex gap={3} color={"ly.700"} alignItems={"center"}>
            <FontAwesomeIcon size="2xl" icon={faCreditCard} />
            <Flex direction={"column"} justifyContent={"center"}>
              <Text fontWeight={"semibold"}>Medios de pagos</Text>
              <Text>
                Tarjetas de crédito o debito, transferencia
                <br /> efectivo o mercado pago
              </Text>
            </Flex>
          </Flex>
          <Flex gap={3} color={"ly.700"} alignItems={"center"}>
            <FontAwesomeIcon size="2xl" icon={faShieldHalved} />
            <Flex direction={"column"} justifyContent={"center"}>
              <Text fontWeight={"semibold"}>Comprá con seguridad</Text>
              <Text>Tus datos siempre protegidos</Text>
            </Flex>
          </Flex>
        </Box>
      )}
      <SimpleGrid
        columns={{ base: 1, md: 2, xl: 3 }}
        justifyContent={"space-evenly"}
        alignItems={"center"}
        my={2}
      >
        <img onClick={()=>handleClickCategory(categories?.find((c)=>c.name == "Combos")?.id || 1) } style={{
          cursor:"pointer"
        }} src="combo.jpg" alt="img" />
        <img onClick={()=>handleClickCategory(categories?.find((c)=>c.name == "Chocolates")?.id || 2)} style={{
          cursor:"pointer"}} src="choco.jpg" alt="img" />
        <img src="mayo.jpg" alt="img" />
      </SimpleGrid>
      <Box my={5} py={5} >
        <Heading textAlign={"center"} color={"ly.700"}>Los favoritos en Tres Hermanitos</Heading>
        <CarouselProducts />
      </Box>
      <WhatsappButton />
      <InstagramButton />
      <ModalHistory />

    </>
  );
}
