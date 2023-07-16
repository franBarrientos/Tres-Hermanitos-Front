import { useToast } from "@chakra-ui/react";
export const useToastResponses = () => {
  const toastLib = useToast();
  const success = (message: string, description: string = "") => {
    return toastLib({
      title: message,
      description: description,
      status: "success",
      duration: 2000,
      position: "top-left",
      isClosable: true,
    });
  };
  const warning = (message: string, description: string = "") => {
    return toastLib({
      title: message,
      description: description,
      status: "warning",
      duration: 2000,
      position: "top-left",
      isClosable: true,
    });
  };
  const error = (message: string, description: string = "") => {
    return toastLib({
      title: message,
      description: description,
      status: "error",
      duration: 2000,
      position: "top-left",
      isClosable: true,
    });
  };

  return {
    error,
    success,
    warning,
  };
};
