import { IRestaurantsRepository } from "@/repositories/restaurants-repository";
import { UpdateRestaurantRequest } from "@/models/restaurants-model";

type UpdateRestaurantUseCaseRequest = {
  id: string;
  body: UpdateRestaurantRequest;
}

export class UpdateRestaurantUseCase {
  constructor(private restaurantsRepository: IRestaurantsRepository) {}

  async execute({ id, body }: UpdateRestaurantUseCaseRequest): Promise<void> {
    await this.restaurantsRepository.update(id, body);
  }
}
