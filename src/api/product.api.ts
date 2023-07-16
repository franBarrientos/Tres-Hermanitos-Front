import { AxiosResponse } from "axios";
import apiClient from "../config/axiosClient";

const prefix = "/product";

export const createNewProduct = (
  formData: FormData
): Promise<AxiosResponse<any, any>> => {
  return apiClient.post(prefix, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
export const updateProduct = (
  formData: FormData,
  id:number
): Promise<AxiosResponse<any, any>> => {
  return apiClient.put(`/product/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
