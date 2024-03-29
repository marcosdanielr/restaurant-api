import { IRestaurantsRepository } from "@/repositories/restaurants-repository";
import { RestaurantNotFoundError } from "../errors/restaurant-not-found-error";

type DeleteRestaurantUseCaseRequest = {
  id: string
}

export class DeleteRestaurantUseCase {
  constructor(private restaurantsRepository: IRestaurantsRepository) {}

  async execute({ id }: DeleteRestaurantUseCaseRequest): Promise<void> {

    const restaurantExists = await this.restaurantsRepository.getById(id);

    if (!restaurantExists) {
      throw new RestaurantNotFoundError();
    } 

    await this.restaurantsRepository.deleteById(id);
  }
}
