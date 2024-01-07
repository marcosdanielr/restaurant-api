import { Restaurant } from "@/models/restaurants-model";
import { IRestaurantsRepository } from "@/repositories/restaurants-repository";

type GetRestaurantUseCaseRequest = {
  id: string
}

type GetRestaurantUseCaseResponse = {
  restaurant: Restaurant | null
}

export class GetRestaurantUseCase {
  constructor(private IRestaurantsRepository: IRestaurantsRepository) {}

  async execute({
    id
  }: GetRestaurantUseCaseRequest): Promise<GetRestaurantUseCaseResponse> {

    const restaurant = await this.IRestaurantsRepository.getById(id);

    return {
      restaurant
    };
  }
}
