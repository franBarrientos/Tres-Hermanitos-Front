import {
  Box,
  Button,
  Flex,
  Img,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import useApp from "../hook/useApp";
import Categoria from "./Categorias";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import MenuMobile from "./MenuMobile";
import ModalCarrito from "./ModalCarrito";
import { useAuth } from "../hook/useAuth";
import { useNavigate } from "react-router-dom";
export default function Sidebar() {
  const { categories, setIsOpenModal, user, setOpenHistory } = useApp();
  const [isLoadingLogout, setIsLoadingLogout] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      w={["full", "full", "60", "72"]}
    >
      {isMobile ? (
        <>
          <ModalCarrito />
          <Flex justifyContent={"space-evenly"} alignItems={"flex-start"}>
            <Img src="logo.PNG" alt="logo svg" w={"44"} />

            <Flex flexDirection={"column"} alignItems={"flex-start"} mb={2}>
              <Text
                fontSize={["2xl", "3xl"]}
                color={"gray.600"}
                fontWeight="bold"
                textAlign={"center"}
                mt={2}
                ml={1}
                mb={1}
              >
                Hello!{" "}
                <Text
                  fontWeight={"bold"}
                  display={"inline"}
                  color={"orange.400"}
                >
                  {user?.firstName?.toUpperCase()}
                </Text>
              </Text>

              <Flex w={"full"} justifyContent={"space-between"} my={2} gap={5}>
                <Box>
                  <Menu>
                    <MenuButton as={Button}>
                      <Img src="me.svg" w={6}></Img>
                    </MenuButton>
                    <MenuList>
                      {user ? (
                        <>
                          <MenuItem
                            bgColor="red"
                            color={"white"}
                            fontSize={"md"}
                            fontWeight={"semibold"}
                            onClick={() => {
                              logout();
                            }}
                          >
                            Logout
                          </MenuItem>
                          {user.customer && (
                            <MenuItem
                              bgColor="blue.500"
                              color={"white"}
                              fontSize={"md"}
                              fontWeight={"semibold"}
                              onClick={() => {
                                setOpenHistory(true);
                              }}
                            >
                              History
                            </MenuItem>
                          )}
                        </>
                      ) : (
                        <MenuItem
                          bgColor="blue.500"
                          color={"white"}
                          fontSize={"md"}
                          fontWeight={"semibold"}
                          onClick={() => {
                            navigate("/auth/login");
                          }}
                        >
                          Login
                        </MenuItem>
                      )}
                    </MenuList>
                  </Menu>
                </Box>

                <Img
                  onClick={() => setIsOpenModal(true)}
                  src="shopping.svg"
                  w={"8"}
                  my={0}
                ></Img>
              </Flex>

              <MenuMobile />
            </Flex>
          </Flex>
        </>
      ) : (
        <>
          <Img src="logo.PNG" alt="logo svg" w={["40", "60", "80"]} />
          <Text
            bgClip="text"
            fontSize={["2xl", "3xl"]}
            color={"gray.600"}
            fontWeight="semibold"
            textAlign={"center"}
            mb={4}
          >
            Hello!{" "}
            <Text fontWeight={"bold"} display={"inline"} color={"orange.400"}>
              {user?.firstName?.toUpperCase()}
            </Text>
          </Text>
          <Box mt={2}>
            {categories?.map((categoria) => (
              <Categoria category={categoria} key={categoria.id} />
            ))}
          </Box>
          {user ? (
            <>
              <Button
                colorScheme="red"
                rounded={"none"}
                isLoading={isLoadingLogout}
                fontSize={"lg"}
                loadingText="Submitting"
                my={3}
                onClick={() => {
                  setIsLoadingLogout(true);
                  logout();
                  setIsLoadingLogout(false);
                }}
              >
                Logout
              </Button>
              {user.customer && (
                <Button
                colorScheme="blue"
                rounded={"none"}
                fontSize={"lg"}
                  onClick={() => {
                    setOpenHistory(true);
                  }}
                >
                  History
                </Button>
              )}
            </>
          ) : (
            <Button
              colorScheme="blue"
              rounded={"none"}
              isLoading={isLoadingLogout}
              fontSize={"lg"}
              my={3}
              onClick={() => {
                navigate("/auth/login");
              }}
            >
              Login
            </Button>
          )}
        </>
      )}
    </Box>
  );
}
