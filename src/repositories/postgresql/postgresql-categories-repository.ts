import { app } from "@/app";
import { ICategoriesRepository } from "../categories-repository";
import { CategoryRequest } from "@/models/categories-model";

export class PostgreSQLCategoriesRepository implements ICategoriesRepository {

  async create(restaurant_id_req: string, body: CategoryRequest) {
    const restaurant_id = restaurant_id_req;
    const { name } = body;

    await app.pg.query(
      "INSERT INTO categories (name, restaurant_id) VALUES ($1, $2) RETURNING *",
      [name, restaurant_id]
    );
  }

  async list(restaurant_id_req: string) {
    const restaurant_id = restaurant_id_req;

    const { rows: categories } = await app.pg.query(
      "SELECT * FROM categories WHERE restaurant_id = $1",
      [restaurant_id]
    );

    return categories;
      
  }
}
