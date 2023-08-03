import { Box, Button, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";

type imgCarousel = {
  urlImg: string;
  name?: string;
};

const carousel: imgCarousel[] = [
  {
    urlImg:
      "https://res.cloudinary.com/dacgvqpeg/image/upload/v1690899182/1-slide-1689854872351-3675768527-512eb5a98140e7f130007113fe4151121689854877-1920-1920_piumwg.webp",
    name: "mayorista",
  },
  {
    urlImg:
      "https://res.cloudinary.com/dacgvqpeg/image/upload/v1690902136/Captura_de_pantalla_2023-08-01_120135_d2q1pv.jpg",
    name: "mercado pago",
  },
  {
    urlImg:
      "https://res.cloudinary.com/dacgvqpeg/image/upload/v1690899177/1-slide-1689604728075-5228352145-350e0837bdd24d3b5bc551ef8256b0ba1689604729-1920-1920_tzgcua.webp",
    name: "block",
  },
];

export default function Carousel() {
  const images = carousel;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(carousel[0]);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 2000);
    return () => clearInterval(interval);
  });

  const previus = () => {
    setLoaded(false);
    setTimeout(() => {
      if (selectedIndex > 0) {
        setSelectedImage(images[selectedIndex - 1]);
        setSelectedIndex(selectedIndex - 1);
      } else {
        setSelectedImage(images[images.length - 1]);
        setSelectedIndex(images.length - 1);
      }
    }, 500);
  };

  const next = () => {
    setLoaded(false);
    setTimeout(() => {
      if (selectedIndex < images.length - 1) {
        setSelectedImage(images[selectedIndex + 1]);
        setSelectedIndex(selectedIndex + 1);
      } else {
        setSelectedImage(images[0]);
        setSelectedIndex(0);
      }
    }, 500);
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
        <img
          style={{
            maxWidth: "1200px",
            width: "100%",
            height: "auto",
            opacity: loaded ? 1 : 0,
            transition: "1s",
          }}
          onLoad={() => setLoaded(true)}
          src={selectedImage.urlImg}
          alt={selectedImage.name}
        />
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={2}
        >
          <Button onClick={previus} bg={"ly.300"}>
            {"<"}
          </Button>
          <Button onClick={next} bg={"ly.300"}>
            {">"}
          </Button>
        </Box>
      </Flex>
    </>
  );
}
