import { Button, Flex, CircularProgress } from "@chakra-ui/react";

type props = {
  isLoadingFetch: boolean;
  setIsLoadingFetch: React.Dispatch<React.SetStateAction<boolean>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages:number,
  forceFetch?:() => Promise<void>
};

export const Paginacion: React.FC<props> = ({
  isLoadingFetch,
  setIsLoadingFetch,
  currentPage,
  setCurrentPage,
  totalPages,
  forceFetch
}) => {
  
  return isLoadingFetch ? (
    <Flex my={5} justifyContent={"center"}>
      <CircularProgress isIndeterminate color="green.300" />
    </Flex>
  ) : (
    <Flex justifyContent={"center"} gap={5} my={20} >
      <Button
      color={"white"}
        bgColor={"ly.700"}
        _hover={{
          bg: "blue.500",
          color: "ly.400",
        }}
        isDisabled={currentPage < 2}
        onClick={() => {
          setIsLoadingFetch(true);
          setCurrentPage(currentPage - 1);
          (forceFetch && forceFetch())
        }}
      >
        Anterior
      </Button>
      <Button
      color={"white"}
        bgColor={"ly.700"}
        _hover={{
          bg: "blue.500",
          color: "ly.400",
        }}
        onClick={() => {
          setIsLoadingFetch(true);
          setCurrentPage(currentPage + 1);
          (forceFetch && forceFetch())

        }}
        isDisabled={currentPage === totalPages}
      >
        Siguiente
      </Button>
    </Flex>
  );
};
