import { RestaurantAddress } from "@/models/restaurant-addresses-model";
import { IRestaurantAddressesRepository } from "@/repositories/restaurant-addresses-repository";
import { IRestaurantsRepository } from "@/repositories/restaurants-repository";
import { RestaurantNotFoundError } from "../errors/restaurant-not-found-error";

type GetRestaurantAddressUseCaseRequest = {
  restaurant_id: string
}

type GetRestaurantAddressUseCaseResponse = {
  restaurantAddress: RestaurantAddress | null
}

export class GetRestaurantAddressUseCase {
  constructor(
    private restaurantAddressesRepository: IRestaurantAddressesRepository,
    private restaurantRepository: IRestaurantsRepository
  ) {}

  async execute({ restaurant_id }: GetRestaurantAddressUseCaseRequest): Promise<GetRestaurantAddressUseCaseResponse> {

    const restaurantExists = await this.restaurantRepository.getById(restaurant_id);

    if (!restaurantExists) {
      throw new RestaurantNotFoundError();
    }

    const restaurantAddress = await this.restaurantAddressesRepository.getByRestaurantId(restaurant_id);

    return {
      restaurantAddress
    };
  }
}
