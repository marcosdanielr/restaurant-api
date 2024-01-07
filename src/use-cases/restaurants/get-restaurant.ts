import { Restaurant } from "@/models/restaurants-model";
import { RestaurantsRepository } from "@/repositories/restaurants-repository";

type GetRestaurantUseCaseRequest = {
  id: string
}

type GetRestaurantUseCaseResponse = {
  restaurant: Restaurant | null
}

export class GetRestaurantUseCase {
  constructor(private restaurantsRepository: RestaurantsRepository) {}

  async execute({
    id
  }: GetRestaurantUseCaseRequest): Promise<GetRestaurantUseCaseResponse> {

    const restaurant = await this.restaurantsRepository.getById(id);

    return {
      restaurant
    };
  }
}
