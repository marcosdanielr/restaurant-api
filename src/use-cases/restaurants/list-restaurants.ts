import { Restaurant } from "@/models/restaurants-model";
import { IRestaurantsRepository } from "@/repositories/restaurants-repository";

type ListRestaurantsUseCaseResponse = {
  restaurants: Restaurant[] 
}

export class ListRestaurantsUseCase {
  constructor(private restaurantsRepository: IRestaurantsRepository) {}

  async execute(): Promise<ListRestaurantsUseCaseResponse> {

    const restaurants = await this.restaurantsRepository.list();

    return {
      restaurants
    }; 
  }
}
