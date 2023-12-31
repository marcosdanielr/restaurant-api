import { RestaurantsRepository } from "@/repositories/restaurants-repository";
import { Restaurant } from "@/types/repositories/restaurants-repository";

type ListRestaurantsUseCaseResponse = {
  restaurants: Restaurant[] 
}

export class ListRestaurantUseCase {
  constructor(private restaurantsRepository: RestaurantsRepository) {}

  async execute(): Promise<ListRestaurantsUseCaseResponse> {

    const restaurants = await this.restaurantsRepository.list();

    return {
      restaurants
    }; 
  }
}
