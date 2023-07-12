import { ProductInterface } from "./product";
import { PurchaseInterface } from "./purchase";

export interface PurchasesProductsInterface {
  id?: number;
  quantity: number;
  purchase: PurchaseInterface | number;
  product: ProductInterface | number;
}
