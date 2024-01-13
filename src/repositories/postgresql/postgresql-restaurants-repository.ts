import { CreateRestaurantRequest, UpdateRestaurantRequest } from "@/models/restaurants-model";
import { IRestaurantsRepository } from "../restaurants-repository";
import { app } from "@/app";

export class PostgreSQLRestaurantsRepository implements IRestaurantsRepository {
  async create(body: CreateRestaurantRequest) {

    const {name, image_path } = body;

    await app.pg.query(
      "INSERT INTO restaurants (name, image_path) VALUES ($1, $2) RETURNING *",
      [name, image_path]
    );
  }

  async list() {
    return [];
  }

  async update(id: string, data: UpdateRestaurantRequest) {
  }

  async getById(id: string) {
    const { rows: restaurants } = await app.pg.query(
      "SELECT * FROM restaurants WHERE id = $1",
      [id]
    );

    const [ restaurant ] = restaurants;

    return restaurant ?? null;

    return null;
  }

  async deleteById(id: string) {
    await app.pg.query(
      "DELETE FROM restaurants WHERE id = $1 RETURNING *",
      [id]
    );
  }
}
