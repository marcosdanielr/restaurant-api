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
      return;
    }

    await app.pg.query(
      "UPDATE restaurants SET name = $2, image_path = $3 WHERE id = $1 RETURNING *",
      [id, name, image_path]
    );
  }

  async getById(req_id: string) {
    const id = req_id;

    if (!id) {
      return null;
    }

    const { rows: restaurants } = await app.pg.query(
      `
    SELECT r.*, 
      CASE 
          WHEN ra.id IS NOT NULL THEN json_build_object(
              'city', ra.city,
              'state', ra.state,
              'street', ra.street,
              'district', ra.district,
              'number', ra.number
          )
          ELSE '{}'::json
      END AS address,
      CASE 
          WHEN COUNT(oh.*) > 0 THEN
              COALESCE(json_agg(
                  json_build_object(
                      'weekday', oh.weekday,
                      'start_time', oh.start_time,
                      'end_time', oh.end_time
                  )
              ), '[]'::json)
          ELSE '[]'::json
      END AS opening_hours
    FROM restaurants r
    LEFT JOIN restaurant_addresses ra ON r.id = ra.restaurant_id
    LEFT JOIN opening_hours oh ON r.id = oh.restaurant_id
    WHERE r.id = $1
    GROUP BY r.id, ra.id;
    `,
      [id]
    );

    const [ restaurant ] = restaurants;

    return restaurant;
  }

  async deleteById(req_id: string) {
    const id = req_id;

    if (!id) {
      return;
    }

    await app.pg.query(
      "DELETE FROM restaurants WHERE id = $1 RETURNING *",
      [id]
    );
  }
}
