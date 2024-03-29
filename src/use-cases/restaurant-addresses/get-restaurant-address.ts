import { RestaurantAddress } from "@/models/restaurant-addresses-model";
import { IRestaurantAddressesRepository } from "@/repositories/restaurant-addresses-repository";

type GetRestaurantAddressUseCaseRequest = {
  restaurant_id: string
}

type GetRestaurantAddressUseCaseResponse = {
  restaurantAddress: RestaurantAddress | null
}

export class GetRestaurantAddressUseCase {
  constructor(private restaurantAddressesRepository: IRestaurantAddressesRepository) {}

  async execute({ restaurant_id }: GetRestaurantAddressUseCaseRequest): Promise<GetRestaurantAddressUseCaseResponse> {

    const restaurantAddress = await this.restaurantAddressesRepository.getByRestaurantId(restaurant_id);

    return {
      restaurantAddress
    };
  }
}
