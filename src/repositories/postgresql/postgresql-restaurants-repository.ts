import { CreateRestaurantRequest, UpdateRestaurantRequest } from "@/models/restaurants-model";
import { IRestaurantsRepository } from "../restaurants-repository";
import { app } from "@/app";

export class PostgreSQLRestaurantsRepository implements IRestaurantsRepository {
  async create(body: CreateRestaurantRequest) {

    const {name, image_path, address} = body;

    const result = await app.pg.query(
      "INSERT INTO restaurants (name, image_path, address) VALUES ($1, $2, $3) RETURNING *",
      [name, image_path, address]
    );

    console.log({
      result
    });
  }

  async list() {
    return [];
  }

  async update(id: string, data: UpdateRestaurantRequest) {
  }

  async getById(id: string){
    return null;
  }

  deleteById(id: string) {
  }
}
