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

  async listByRestaurantId(restaurant_id_req: string) {
    const restaurant_id = restaurant_id_req;

    const { rows: products } = await app.pg.query(
      `
    SELECT p.*, 
           CASE
             WHEN COUNT(pr.id) > 0 THEN
               COALESCE(json_agg(
                 json_build_object(
                   'description', pr.description,
                   'price', pr.price,
                   'weekday', pr.weekday,
                   'start_time', pr.start_time,
                   'end_time', pr.end_time
                 )
               ), '[]'::json)
             ELSE '[]'::json
           END AS promotions
    FROM products p
    LEFT JOIN promotions pr ON p.id = pr.product_id
    WHERE p.restaurant_id = $1
    GROUP BY p.id, p.restaurant_id, p.category_id, p.name, p.image_path, p.price, p.created_at, p.updated_at
    `,
      [restaurant_id]
    );

    return products;
  }

  async getById(id_req: string) {
    const id = id_req;

    const { rows } = await app.pg.query(
      "SELECT * FROM products WHERE id = $1 LIMIT 1",
      [id]
    );

    const [product] = rows;

    return product || null; 
  }
}
