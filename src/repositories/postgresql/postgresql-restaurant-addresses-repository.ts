import { app } from "@/app";
import { IRestaurantAddressesRepository } from "../restaurant-addresses-repository";
import { CreateRestaurantAddressRequest } from "@/models/restaurant-addresses-model";

export class PostgreSQLRestaurantAddressesRepository implements IRestaurantAddressesRepository {

  async create(body: CreateRestaurantAddressRequest) {
    const { 
      restaurant_id,
      city,
      state,
      street,
      district,
      number
    } = body;

    await app.pg.query(
      "INSERT INTO restaurant_addresses (restaurant_id, city, state, street, district, number) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [restaurant_id, city, state, street, district, number]
    );
  }

  async getByRestaurantId(restaurant_id_req: string) {
    const restaurant_id = restaurant_id_req;

    const { rows } = await app.pg.query(
      "SELECT * FROM restaurant_addresses WHERE restaurant_id = $1 LIMIT 1",
      [restaurant_id]
    );

    const [ restaurantAddress ] = rows;

    return restaurantAddress || null; 
  }
}
