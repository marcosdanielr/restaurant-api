import { RestaurantsRepository } from "@/repositories/restaurants-repository";
import { CreateRestaurantInput } from "@/types/repositories/restaurants-repository";

export class CreateRestaurantUseCase {
  constructor(private restaurantsRepository: RestaurantsRepository) {}

  async execute({
    name,
    image_path,
    address
  }: CreateRestaurantInput): Promise<void> {

    await this.restaurantsRepository.create({
      name,
      image_path,
      address
    });
  }
}
