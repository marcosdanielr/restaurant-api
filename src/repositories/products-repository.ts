import { CreateProductRequest, Product, UpdateProductRequest } from "@/models/products-model";

export interface IProductsRepository {
  create(restaurant_id: string, body: CreateProductRequest): Promise<void>;
  getById(id: string): Promise<Product | null>;
  listByRestaurantId(restaurant_id: string): Promise<Product[]>;
  delete(restaurant_id: string, id: string): Promise<void>;
  update(restaurant_id: string, id: string, body: UpdateProductRequest): Promise<void>;
}
