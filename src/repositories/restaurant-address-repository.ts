import { RestaurantAddress } from "@/models/restaurant-address-model";

export interface IRestaurantsAddressRepository {
  create(body: RestaurantAddress): Promise<void>;
}
