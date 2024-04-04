import { CreateRestaurantAddressRequest, RestaurantAddress, UpdateRestaurantAddressRequest } from "@/models/restaurant-addresses-model";
import { IRestaurantAddressesRepository } from "../restaurant-addresses-repository";
import { randomUUID } from "crypto";

export class InMemoryRestaurantAddressesRepository implements IRestaurantAddressesRepository {
  public restaurantsAdresses: RestaurantAddress[] = []; 

  async create(body: CreateRestaurantAddressRequest) {
    const { restaurant_id, city, state, street, district, number } = body;

    const restaurantAddress: RestaurantAddress = {
      id: randomUUID(),
      restaurant_id,
      city,
      state,
      street,
      district,
      number,
      created_at: new Date(),
      updated_at: new Date()
    };

    this.restaurantsAdresses.push(restaurantAddress);
  }

  async update(restaurant_id: string, body: UpdateRestaurantAddressRequest) {
    const index = this.restaurantsAdresses.findIndex(restaurantAddress => restaurantAddress.restaurant_id === restaurant_id);

    if (index >= 0) {
      this.restaurantsAdresses[index] = {
        ...this.restaurantsAdresses[index],
        ...body,
        created_at: this.restaurantsAdresses[index].created_at,
        updated_at: new Date(),
      };
    }
      
  }

  async getByRestaurantId(restaurant_id: string) {

    const restaurantAddress = this.restaurantsAdresses.find(restaurantAddress => restaurantAddress.restaurant_id === restaurant_id) || null;
    return restaurantAddress;
  }
}
