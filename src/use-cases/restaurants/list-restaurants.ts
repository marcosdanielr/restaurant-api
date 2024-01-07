import { Restaurant } from "@/models/restaurants-model";
import { RestaurantsRepository } from "@/repositories/restaurants-repository";

type ListRestaurantsUseCaseResponse = {
  restaurants: Restaurant[] 
}

export class ListRestaurantsUseCase {
  constructor(private restaurantsRepository: RestaurantsRepository) {}

  async execute(): Promise<ListRestaurantsUseCaseResponse> {

    const restaurants = await this.restaurantsRepository.list();

    return {
      restaurants
    }; 
  }
}
