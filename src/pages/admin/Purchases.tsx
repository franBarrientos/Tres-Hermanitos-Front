import { SimpleGrid, Text, Box, Flex } from "@chakra-ui/react";
import useSWR from "swr";
import apiClient from "../../config/axiosClient";
import { useState } from "react";
import { Paginacion } from "../../components/Paginacion";
import { CardPurchaseAdmin } from "../../components/CardPurchaseAdmin";
import { SearchPurchasestButton } from "../../components/SearchPurchasesButton";

export const Purchases = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoadingFetch, setIsLoadingFetch] = useState<boolean>(false);
  const fetcher = async () => {
    try {
      const response = await apiClient(`/purchase?skip=${currentPage}`);
      if (!response.data.ok) throw new Error("err");
      setTotalPages(response.data.body.totalPages);
      setIsLoadingFetch(false);
      return response.data;
    } catch (error) {
      setIsLoadingFetch(false);
      throw new Error("Err");
    }
  };

  const { data, isLoading, error } = useSWR("/purchase", fetcher, {
    refreshInterval: 1000,
  });

  if (isLoading) return <Text>Loading...</Text>;
  if (error)
    return (
      <Text color="ly.700" textAlign={"center"} fontSize={"2xl"}>
        Aun no hay ventas
      </Text>
    );

  return (
    <Box justifyContent={"center"}>
      <Flex w={"full"} justifyContent={"center"}>
        <SearchPurchasestButton/>
      </Flex>
      <SimpleGrid mt={10} gap={4} columns={[1, 2, 2, 3, 4]}>
        {data.body.purchases.map((purchase: any) => {
          return <CardPurchaseAdmin purchase={purchase} key={purchase.id} />;
        })}
      </SimpleGrid>
      <Paginacion
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isLoadingFetch={isLoadingFetch}
        setIsLoadingFetch={setIsLoadingFetch}
        totalPages={totalPages}
      />
    </Box>
  );
};
