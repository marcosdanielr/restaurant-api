import { Restaurant } from "@/models/restaurants-model";
import { IRestaurantsRepository } from "@/repositories/restaurants-repository";

type ListRestaurantsUseCaseResponse = {
  restaurants: Restaurant[] 
}

export class ListRestaurantsUseCase {
  constructor(private IRestaurantsRepository: IRestaurantsRepository) {}

  async execute(): Promise<ListRestaurantsUseCaseResponse> {

    const restaurants = await this.IRestaurantsRepository.list();

    return {
      restaurants
    }; 
  }
}
