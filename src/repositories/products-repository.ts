import { CreateProductInput, Product } from "@/types/products/products-repository";

export interface ProductsRepository {
  create(restaurant_id: string, body: CreateProductInput): Promise<void>;
  listRestaurantProducts(restaurant_id: string): Promise<Product[]>;
  delete(restaurant_id: string, id: string): Promise<void>;
}
