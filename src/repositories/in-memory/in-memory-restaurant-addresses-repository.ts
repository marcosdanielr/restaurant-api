import { CreateRestaurantAddressRequest, RestaurantAddress } from "@/models/restaurant-addresses-model";
import { IRestaurantAddressesRepository } from "../restaurant-addresses-repository";
import { randomUUID } from "crypto";

export class InMemoryRestaurantAddressesRepository implements IRestaurantAddressesRepository {
  public restaurantsAdresses: RestaurantAddress[] = []; 

  async create(body: CreateRestaurantAddressRequest) {
    const { restaurant_id, city, state, street, district, number, zip_code } = body;

    const restaurantAddress: RestaurantAddress = {
      id: randomUUID(),
      restaurant_id,
      city,
      state,
      street,
      district,
      number,
      zip_code,
      created_at: new Date()
    };

    this.restaurantsAdresses.push(restaurantAddress);
  }

  async getByRestaurantId(restaurant_id: string) {

    const restaurantAddress = this.restaurantsAdresses.find(restaurantAddress => restaurantAddress.restaurant_id === restaurant_id) || null;
    return restaurantAddress;
  }
}
