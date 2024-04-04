import { CreateRestaurantAddressRequest, RestaurantAddress, UpdateRestaurantAddressRequest } from "@/models/restaurant-addresses-model";

export interface IRestaurantAddressesRepository {
  create(body: CreateRestaurantAddressRequest): Promise<void>;
  update(restaurant_id: string, body: UpdateRestaurantAddressRequest): Promise<void>;
  getByRestaurantId(restaurant_id: string): Promise<RestaurantAddress | null>;
}
