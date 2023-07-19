import { useToast } from "@chakra-ui/react";
import apiClient from "../config/axiosClient";
import { useNavigate } from "react-router-dom";
import useApp from "./useApp";
import { AxiosResponse } from "axios";

export const useAuth = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { setUser } = useApp();
  const login = async (
    formData: any,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>> | null,
    googleSignIn: AxiosResponse<any, any> | null = null
  ) => {
    try {
      let response = googleSignIn
        ? googleSignIn
        : await apiClient.post("/login", formData);
      const { data } = response;
      if (!data.ok) throw new Error("err");
      if (data.body.user.role == "USER") {
        toast({
          title: `Bienvenido ${data.body.user.firstName}!!`,
          description: "Inicio de sesion exitoso",
          status: "success",
          duration: 2000,
          position: "top-left",
          isClosable: true,
        });
        localStorage.setItem("token", data.body.token);
        localStorage.setItem("user", JSON.stringify(data.body.user));
        setUser(data.body.user);
        if (setIsLoading) setIsLoading(false);
        navigate("/");
      } else {
        toast({
          title: `Bienvenido ${data.body.user.firstName}`,
          description: "Inicio de sesion exitoso",
          status: "success",
          duration: 2000,
          position: "top-left",
          isClosable: true,
        });
        localStorage.setItem("token", data.body.token);
        localStorage.setItem("user", JSON.stringify(data.body.user));
        setUser(data.body.user);
        if (setIsLoading) setIsLoading(false);
        navigate("/admin");
      }
    } catch (error) {
      console.log(error);
      if (setIsLoading) setIsLoading(false);
      toast({
        title: "Valores Incorrecto.",
        description: "Por favor ingrese valores validos",
        status: "error",
        position: "top-left",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    toast({
      title: `Sesion cerrada`,
      description: "Vuelve Pronto!",
      status: "warning",
      duration: 2000,
      position: "top-left",
      isClosable: true,
    });
  };

  const register = async (
    formData: any,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      const response = await apiClient.post("/users", {
        ...formData,
        role: "USER",
      });
      const { data } = response;
      if (data.ok == true) {
        toast({
          title: `Bienvenido ${data.body.user.firstName}`,
          description: "Inicio de sesion exitoso",
          status: "success",
          duration: 2000,
          position: "top-left",
          isClosable: true,
        });
        localStorage.setItem("token", data.body.token);
        localStorage.setItem("user", data.body.user);
        setUser(data.body.user);
        setIsLoading(false);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast({
        title: "Valores Incorrecto.",
        description: "Por favor ingrese valores validos",
        status: "error",
        position: "top-left",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return {
    login,
    logout,
    register,
  };
};
