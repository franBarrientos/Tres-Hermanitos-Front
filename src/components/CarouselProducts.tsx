import { Box, Button, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import apiClient from "../config/axiosClient";
import { ProductInterface } from "../interfaces/product";
import Producto from "./Producto";
import { useMediaQuery } from "react-responsive";

export default function CarouselProducts() {
  const [favoritos, setFavoritos] = useState<ProductInterface[] | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<ProductInterface | null>(
    null
  );
  const [visibleProducts, setVisibleProducts] = useState<ProductInterface[]>(
    []
  );
  const isMobile = useMediaQuery({
    maxWidth: 1228,
  });

  useEffect(() => {
    const fecthFav = async () => {
      try {
        const response = await apiClient("/favs");
        setFavoritos(response.data.body);
        const initialVisibleProducts = response.data.body.slice(0, 3);
        setVisibleProducts(initialVisibleProducts);

        setSelectedImage(response.data.body[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fecthFav();
  }, []);

  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        next();
      }, 2000);
      return () => clearInterval(interval);
    } else {
      const interval = setInterval(() => {
        nextDesktop();
      }, 1000);
      return () => clearInterval(interval);
    }
  });

  const previus = () => {
    if (favoritos) {
      setTimeout(() => {
        if (selectedIndex > 0) {
          setSelectedImage(favoritos[selectedIndex - 1]);
          setSelectedIndex(selectedIndex - 1);
        } else {
          setSelectedImage(favoritos[favoritos.length - 1]);
          setSelectedIndex(favoritos.length - 1);
        }
      }, 500);
    }
  };

  const next = () => {
    if (favoritos) {
      setTimeout(() => {
        if (selectedIndex < favoritos.length - 1) {
          setSelectedImage(favoritos[selectedIndex + 1]);
          setSelectedIndex(selectedIndex + 1);
        } else {
          setSelectedImage(favoritos[0]);
          setSelectedIndex(0);
        }
      }, 500);
    }
  };

  const previusDesktop = () => {
    if (favoritos) {
      setTimeout(() => {
        setSelectedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : favoritos.length - 1
        );

        const newIndex =
          selectedIndex > 0 ? selectedIndex - 1 : favoritos.length - 1;
        const newVisibleProducts = favoritos.slice(newIndex, newIndex + 3);
        setVisibleProducts(newVisibleProducts);
      }, 500);
    }
  };

  const nextDesktop = () => {
    if (favoritos) {
      setTimeout(() => {
        setSelectedIndex((prevIndex) =>
          prevIndex < favoritos.length - 1 ? prevIndex + 1 : 0
        );

        const newIndex =
          selectedIndex < favoritos.length - 1 ? selectedIndex + 1 : 0;
        const newVisibleProducts = favoritos.slice(newIndex, newIndex + 3);
        setVisibleProducts(newVisibleProducts);
      }, 500);
    }
  };

  return (
    <>
      <Flex
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={2}
        mt={4}
      >
        {isMobile && selectedImage && (
          <Producto
            isAdmin={false}
            key={selectedImage?.id}
            producto={selectedImage}
          />
        )}
        {!isMobile && visibleProducts && (
          <Flex justifyContent={"center"}>
            {visibleProducts.map((p) => (
              <Producto key={p.id} isAdmin={false} producto={p} />
            ))}
          </Flex>
        )}
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={2}
        >
          <Button
            onClick={() => (isMobile ? previus() : previusDesktop())}
            bg={"ly.300"}
          >
            {"<"}
          </Button>
          <Button
            onClick={() => (isMobile ? next() : nextDesktop())}
            bg={"ly.300"}
          >
            {">"}
          </Button>
        </Box>
      </Flex>
    </>
  );
}
