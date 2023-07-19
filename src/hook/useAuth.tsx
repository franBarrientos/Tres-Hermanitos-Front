import apiClient from "../config/axiosClient";
import { useNavigate } from "react-router-dom";
import useApp from "./useApp";
import { AxiosResponse } from "axios";
import { useToastResponses } from "./useToastResponses";

export const useAuth = () => {
  const { success, error, warning } = useToastResponses();
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
        success(
          `Bienvenido ${data.body.user.firstName}!!`,
          "Inicio de sesion exitoso"
        );
        localStorage.setItem("token", data.body.token);
        localStorage.setItem("user", JSON.stringify(data.body.user));
        setUser(data.body.user);
        if (setIsLoading) setIsLoading(false);
        navigate("/");
      } else {
        success(
          `Bienvenido ${data.body.user.firstName}`,
          "Inicio de sesion exitoso"
        );
        localStorage.setItem("token", data.body.token);
        localStorage.setItem("user", JSON.stringify(data.body.user));
        setUser(data.body.user);
        if (setIsLoading) setIsLoading(false);
        navigate("/admin");
      }
    } catch (errorFromCatch) {
      console.log(errorFromCatch);
      if (setIsLoading) setIsLoading(false);
      error("Valores Incorrecto.", "Por favor ingrese valores validos");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    warning(`Sesion cerrada`, "Vuelve Pronto!");
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
        success(
          `Bienvenido ${data.body.user.firstName}`,
          "Inicio de sesion exitoso"
        );
        localStorage.setItem("token", data.body.token);
        localStorage.setItem("user", data.body.user);
        setUser(data.body.user);
        setIsLoading(false);
        navigate("/");
      }
    } catch (errorFromCatch) {
      console.log(errorFromCatch);
      setIsLoading(false);
      error("Valores Incorrecto.", "Por favor ingrese valores validos");
    }
  };

  return {
    login,
    logout,
    register,
  };
};
