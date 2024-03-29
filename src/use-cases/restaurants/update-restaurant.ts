import { IRestaurantsRepository } from "@/repositories/restaurants-repository";
import { UpdateRestaurantRequest } from "@/models/restaurants-model";
import { RestaurantNotFoundError } from "../errors/restaurant-not-found-error";

type UpdateRestaurantUseCaseRequest = {
  id: string;
  body: UpdateRestaurantRequest;
}

export class UpdateRestaurantUseCase {
  constructor(private restaurantsRepository: IRestaurantsRepository) {}

  async execute({ id, body }: UpdateRestaurantUseCaseRequest): Promise<void> {

    const restaurantExists = await this.restaurantsRepository.getById(id);

    if (!restaurantExists) {
      throw new RestaurantNotFoundError();
    } 

    await this.restaurantsRepository.update(id, body);
  }
}
