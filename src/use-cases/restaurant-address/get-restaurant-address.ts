import { IRestaurantAddressRepository } from "@/repositories/restaurant-address-repository";
import { RestaurantAddress } from "@/models/restaurant-address-model";

type GetRestaurantAddressUseCaseRequest = {
  restaurant_id: string
}

type GetRestaurantAddressUseCaseResponse = {
  restaurantAddress: RestaurantAddress | null
}

export class GetRestaurantAddressUseCase {
  constructor(private restaurantsRepository: IRestaurantAddressRepository) {}

  async execute({ restaurant_id }: GetRestaurantAddressUseCaseRequest): Promise<GetRestaurantAddressUseCaseResponse> {

    const restaurantAddress = await this.restaurantsRepository.getByRestaurantId(restaurant_id);

    return {
      restaurantAddress
    };
  }
}
