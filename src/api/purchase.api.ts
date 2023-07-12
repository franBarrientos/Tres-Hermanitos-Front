import { AxiosResponse } from "axios";
import apiClient from "../config/axiosClient";
import { PurchaseInterface } from "../interfaces/purchase";
import { ProductInterface } from "../interfaces/product";

const prefix = "/purchase";
const mpPrefix = "/create-order-mp"

export const createPurchase = (purchase:PurchaseInterface): Promise<AxiosResponse<any, any>> => {
  return apiClient.post(prefix, purchase);
};


export const createOrderMp = (carrito:ProductInterface[] | ProductInterface, idPurchase:number): Promise<AxiosResponse<any, any>> => {
  return apiClient.post(mpPrefix, {carrito, idPurchase });
};


