import { RestaurantAddress } from "@/models/restaurant-address-model";
import { IRestaurantsAddressRepository } from "../restaurant-address-repository";

export class InMemoryRestaurantAddressRepository implements IRestaurantsAddressRepository {
  public restaurantsAdresses: RestaurantAddress[] = []; 

  async create(body: RestaurantAddress) {
    const { restaurant_id, street, district, number, zip_code } = body;

    const restaurantAddress: RestaurantAddress = {
      restaurant_id,
      street,
      district,
      number,
      zip_code
    };

    this.restaurantsAdresses.push(restaurantAddress);
  }
}
