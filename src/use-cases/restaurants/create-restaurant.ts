import { CreateRestaurantRequest } from "@/models/restaurants-model";
import { IRestaurantsRepository } from "@/repositories/restaurants-repository";

export class CreateRestaurantUseCase {
  constructor(private IRestaurantsRepository: IRestaurantsRepository) {}

  async execute({
    name,
    image_path,
    address
  }: CreateRestaurantRequest): Promise<void> {

    await this.IRestaurantsRepository.create({
      name,
      image_path,
      address
    });
  }
}
