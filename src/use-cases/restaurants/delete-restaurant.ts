import { IRestaurantsRepository } from "@/repositories/restaurants-repository";

type DeleteRestaurantUseCaseRequest = {
  id: string
}

export class DeleteRestaurantUseCase {
  constructor(private IRestaurantsRepository: IRestaurantsRepository) {}

  async execute({ id }: DeleteRestaurantUseCaseRequest): Promise<void> {
    await this.IRestaurantsRepository.deleteById(id);
  }
}
