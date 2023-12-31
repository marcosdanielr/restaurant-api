import { CreateRestaurantInput } from "@/types/repositories/restaurants-repository";

export interface RestaurantsRepository {
  create(body: CreateRestaurantInput): Promise<void>
}
