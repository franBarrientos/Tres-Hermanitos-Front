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
import { useState } from "react";
import { PurchaseInterface } from "../../interfaces/purchase";
import apiClient from "../../config/axiosClient";
import { CardHistory } from "./CardHistory";
export default function ModalHistory() {
  const { openHistory, setOpenHistory, user, flatFetch, setFlatFetch } =
    useApp();
  const [purchases, setPurchases] = useState<PurchaseInterface[] | null>(null);

  const fetchPurchases = async () => {
    try {
      const { data } = await apiClient.get(
        `/purchase/customer/${user?.customer?.id}`
      );
      setPurchases(data.body);
    } catch (error) {
      console.log(error);
    }
  };
  if (openHistory && !flatFetch) {
    fetchPurchases();
    setFlatFetch(true);
  }

  
  return !purchases && openHistory ? (
    <Flex mt={4} justifyContent={"center"} alignItems={"center"}>
      <CircularProgress isIndeterminate color="green.300" />
    </Flex>
  ) : (
    <>
      <Modal isOpen={openHistory} onClose={() => setOpenHistory(false)}>
        <ModalOverlay />
        <ModalContent maxH={"90%"} overflowY={"scroll"}>
          <ModalHeader>🛍 Purchases</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {purchases?.map((purchase) => {
              return <CardHistory key={purchase.id} {...purchase} />;
            })}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => setOpenHistory(false)}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
