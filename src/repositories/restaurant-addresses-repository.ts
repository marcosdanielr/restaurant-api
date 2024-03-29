import { CreateRestaurantAddressRequest, RestaurantAddress } from "@/models/restaurant-addresses-model";

export interface IRestaurantAddressesRepository {
  create(body: CreateRestaurantAddressRequest): Promise<void>;
  getByRestaurantId(restaurantId: string): Promise<RestaurantAddress | null>;
}
