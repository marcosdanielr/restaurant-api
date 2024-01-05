import { ProductsRepository } from "../products-repository";
import {
  Product,
  CreateProductInput,
} from "@/types/products/products-repository";
import { randomUUID } from "crypto";

export class InMemoryProductsRepository implements ProductsRepository {
  public products: Product[] = [];

  async create(restaurant_id: string, body: CreateProductInput) {
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

  async listRestaurantProducts(restaurant_id: string) {
    const products = this.products.filter(product => product.restaurant_id === restaurant_id); 

    return products;
  }

  async delete(restaurant_id: string, id: string) {
    const index = this.products.findIndex(product => product.restaurant_id === restaurant_id && product.id === id);

    if (index >= 0) {
      this.products.splice(index, 1);
    }
      
  }
}
