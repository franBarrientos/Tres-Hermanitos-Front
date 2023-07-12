import { AxiosResponse } from "axios";
import apiClient from "../config/axiosClient";

const prefix = "/category";

export const getAllCategories = (): Promise<AxiosResponse<any, any>> => {
  return apiClient.get(prefix);
};
