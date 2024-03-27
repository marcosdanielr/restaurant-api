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
    const { rows: restaurants } = await app.pg.query(
      "SELECT * FROM restaurants",
      []
    );

    return restaurants;
  }

  async update(req_id: string, data: UpdateRestaurantRequest) {
    const id = req_id;
    const { name, image_path } = data;

    if (!id) {
      return
    }

    await app.pg.query(
      "UPDATE restaurants SET name = $2, image_path = $3 WHERE id = $1 RETURNING *",
      [id, name, image_path]
    );
  }

  async getById(req_id: string) {
    const id = req_id;

    if (!id) {
      return null
    }

    const { rows: restaurants } = await app.pg.query(
      "SELECT * FROM restaurants WHERE id = $1 LIMIT 1",
      [id]
    );


    const [ restaurant ] = restaurants;

    return restaurant;
  }

  async deleteById(req_id: string) {
    const id = req_id;

    if (!id) {
      return
    }

    await app.pg.query(
      "DELETE FROM restaurants WHERE id = $1 RETURNING *",
      [id]
    );
  }
}
