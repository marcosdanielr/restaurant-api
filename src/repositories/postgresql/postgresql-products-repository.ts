import { app } from "@/app";
import { IProductsRepository } from "../products-repository";
import { CreateProductRequest, UpdateProductRequest } from "@/models/products-model";

export class PostgreSQLProductsRepository implements IProductsRepository {

  async create(restaurant_id_req: string, body: CreateProductRequest) {
    const restaurant_id = restaurant_id_req;
    const { name, image_path, price, category_id } = body;

    await app.pg.query(
      "INSERT INTO products (name, image_path, price, restaurant_id, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, image_path, price, restaurant_id, category_id]
    );
  }

  async delete(restaurant_id: string, id: string) {
      
  }

  async update(restaurant_id: string, id: string, body: UpdateProductRequest) {
      
  }

  async listRestaurantProducts(restaurant_id: string) {
    return []; 
  }


}
