import { IRestaurantsRepository } from "@/repositories/restaurants-repository";
import { UpdateRestaurantRequest } from "@/models/restaurants-model";

type UpdateRestaurantUseCaseRequest = {
  id: string;
  body: UpdateRestaurantRequest;
}

export class UpdateRestaurantUseCase {
  constructor(private IRestaurantsRepository: IRestaurantsRepository) {}

  async execute({ id, body }: UpdateRestaurantUseCaseRequest): Promise<void> {
    await this.IRestaurantsRepository.update(id, body);
  }
}
