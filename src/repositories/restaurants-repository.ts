import { CreateRestaurantInput, Restaurant, UpdateRestaurantInput } from "@/types/repositories/restaurants-repository";

export interface RestaurantsRepository {
  create(body: CreateRestaurantInput): Promise<void>;
  list(): Promise<Restaurant[]>;
  getById(id: string): Promise<Restaurant | null>;
  deleteById(id: string): Promise<void>;
  update(id: string, data: UpdateRestaurantInput): Promise<void>;
}
