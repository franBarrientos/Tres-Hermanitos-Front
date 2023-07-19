import {
  Button,
  CircularProgress,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import useApp from "../../hook/useApp";
import { useState, useEffect } from "react";
import { PurchaseInterface } from "../../interfaces/purchase";
import apiClient from "../../config/axiosClient";
import { CardHistory } from "./CardHistory";
import { modalesRX } from "../../helpers/subjectsRx.helper";
export default function ModalHistory() {
  const { user } = useApp();
  const [openHistory, setOpenHistory] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [purchases, setPurchases] = useState<PurchaseInterface[] | null>(null);
  const observable = modalesRX.getSubject;

  const fetchPurchases = async () => {
    try {
      const { data } = await apiClient.get(
        `/purchase/customer/${user?.customer?.id}`
      );
      setPurchases(data.body);
    } catch (error) {
      setOpenHistory(false);
      console.log(error);
    }
    setIsLoading(false)
  };

  useEffect(() => {
    observable.subscribe(([objeto, value]) => {
      if (objeto == "history" && value) {
          console.log("data")
          setOpenHistory(true);
          setIsLoading(true);
          fetchPurchases();
      } else {
        (objeto == "history" && setOpenHistory(false));
      }
    });
  }, []);


  return openHistory && isLoading ? (
    <Flex mt={4} justifyContent={"center"} alignItems={"center"}>
      <CircularProgress isIndeterminate color="green.300" />
    </Flex>
  ) : (
    <>
      <Modal isOpen={openHistory} onClose={() => setOpenHistory(false)}>
        <ModalOverlay />
        <ModalContent
          maxH={"90%"}
          overflowY={"scroll"}
          bg={"ly.900"}
          color={"ly.700"}
        >
          <ModalHeader>🛍 Compras 🛍</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {purchases?.map((purchase) => {
              return <CardHistory key={purchase.id} {...purchase} />;
            })}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => setOpenHistory(false)}
            >
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
