import { CreateRestaurantRequest, Restaurant, UpdateRestaurantRequest } from "@/models/restaurants-model";

export interface RestaurantsRepository {
  create(body: CreateRestaurantRequest): Promise<void>;
  list(): Promise<Restaurant[]>;
  getById(id: string): Promise<Restaurant | null>;
  deleteById(id: string): Promise<void>;
  update(id: string, data: UpdateRestaurantRequest): Promise<void>;
}
