import { CreateProductInput, Product, UpdateProductInput } from "@/types/repositories/products-repository";

export interface ProductsRepository {
  create(restaurant_id: string, body: CreateProductInput): Promise<void>;
  listRestaurantProducts(restaurant_id: string): Promise<Product[]>;
  delete(restaurant_id: string, id: string): Promise<void>;
  update(restaurant_id: string, id: string, body: UpdateProductInput): Promise<void>;
}
