import { OpeningHours } from "@/models/opening-hours-model";
import { IOpeningHoursRepository } from "@/repositories/opening-hours-repository";
import { IRestaurantsRepository } from "@/repositories/restaurants-repository";
import { RestaurantNotFoundError } from "../errors/restaurant-not-found-error";

type ListOpeningHoursUseCaseRequest = {
  restaurant_id: string;
}

type ListOpeningHoursUseCaseResponse = {
  openingHours: OpeningHours[]
}

export class ListOpeningHoursUseCase {
  constructor(
    private openingHoursRepository: IOpeningHoursRepository,
    private restaurantRepository: IRestaurantsRepository
  ) {}

  async execute({
    restaurant_id,
  }: ListOpeningHoursUseCaseRequest): Promise<ListOpeningHoursUseCaseResponse> {

    const restaurantExists = await this.restaurantRepository.getById(restaurant_id);

    if (!restaurantExists) {
      throw new RestaurantNotFoundError();
    }

    const openingHours = await this.openingHoursRepository.list(restaurant_id);

    return {
      openingHours
    };
  }
}
