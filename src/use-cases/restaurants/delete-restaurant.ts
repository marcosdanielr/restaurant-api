import { RestaurantsRepository } from "@/repositories/restaurants-repository";

type DeleteRestaurantUseCaseRequest = {
  id: string
}

export class DeleteRestaurantUseCase {
  constructor(private restaurantsRepository: RestaurantsRepository) {}

  async execute({ id }: DeleteRestaurantUseCaseRequest): Promise<void> {
    await this.restaurantsRepository.deleteById(id);
  }
}
