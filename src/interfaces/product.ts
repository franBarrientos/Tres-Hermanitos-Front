import { CategoryInterface } from "./category";

export interface ProductInterface {
  id: number;

  name: string;

  description: string;

  img: string;

  price: number;

  quantity?: number;

  category: CategoryInterface;
}
