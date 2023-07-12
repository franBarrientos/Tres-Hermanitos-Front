import { CustomerInterface } from "./customer";
import { PurchasesProductsInterface } from "./purchasesProducts";

export interface PurchaseInterface {
  id?: number;
  state: string;
  payment: string;
  customer: CustomerInterface | number;
  purchasesProducts?: PurchasesProductsInterface[];
}
