import { CreateRestaurantRequest } from "@/models/restaurants-model";
import { RestaurantsRepository } from "@/repositories/restaurants-repository";

export class CreateRestaurantUseCase {
  constructor(private restaurantsRepository: RestaurantsRepository) {}

  async execute({
    name,
    image_path,
    address
  }: CreateRestaurantRequest): Promise<void> {

    await this.restaurantsRepository.create({
      name,
      image_path,
      address
    });
  }
}
