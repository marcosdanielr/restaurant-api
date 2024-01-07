import { IRestaurantsRepository } from "@/repositories/restaurants-repository";

type DeleteRestaurantUseCaseRequest = {
  id: string
}

export class DeleteRestaurantUseCase {
  constructor(private restaurantsRepository: IRestaurantsRepository) {}

  async execute({ id }: DeleteRestaurantUseCaseRequest): Promise<void> {
    await this.restaurantsRepository.deleteById(id);
  }
}
