import { CreateRestaurantInput, Restaurant } from "@/types/repositories/restaurants-repository";

export interface RestaurantsRepository {
  create(body: CreateRestaurantInput): Promise<void>;
  list(): Promise<Restaurant[]>;
}
