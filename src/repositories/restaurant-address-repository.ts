import { RestaurantAddress } from "@/models/restaurant-addresses-model";

export interface IRestaurantAddressRepository {
  create(body: RestaurantAddress): Promise<void>;
  getByRestaurantId(restaurantId: string): Promise<RestaurantAddress | null>;
}
