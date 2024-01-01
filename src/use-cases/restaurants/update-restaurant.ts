import { RestaurantsRepository } from "@/repositories/restaurants-repository";
import { UpdateRestaurantInput } from "@/types/repositories/restaurants-repository";

type UpdateRestaurantUseCaseRequest = {
  id: string;
  body: UpdateRestaurantInput;
}

export class UpdateRestaurantUseCase {
  constructor(private restaurantsRepository: RestaurantsRepository) {}

  async execute({ id, body }: UpdateRestaurantUseCaseRequest): Promise<void> {
    await this.restaurantsRepository.update(id, body);
  }
}
