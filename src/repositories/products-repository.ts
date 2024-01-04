import { CreateProductInput } from "@/types/products/products-repository";

export interface ProductsRepository {
  create(restaurant_id: string, body: CreateProductInput): Promise<void>;
}
