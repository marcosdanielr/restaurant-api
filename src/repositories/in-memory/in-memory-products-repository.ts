import { ProductsRepository } from "../products-repository";
import {
  Product,
  CreateProductInput,
} from "@/types/products/products-repository";
import { randomUUID } from "crypto";

export class InMemoryProductsRepository implements ProductsRepository {
  public products: Product[] = [];

  async create(restaurant_id: string, body: CreateProductInput): Promise<void> {
    const product = {
      id: randomUUID(),
      restaurant_id,
      category_id: body.category_id,
      name: body.name,
      price: body.price,
      image_path: body.image_path,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.products.push(product);
  }
}
