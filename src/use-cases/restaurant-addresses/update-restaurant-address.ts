import { UpdateRestaurantAddressRequest } from "@/models/restaurant-addresses-model";
import { IRestaurantAddressesRepository } from "@/repositories/restaurant-addresses-repository";
import { IRestaurantsRepository } from "@/repositories/restaurants-repository";
import { RestaurantNotFoundError } from "../errors/restaurant-not-found-error";
import { RestaurantAddressNotFoundError } from "../errors/restaurant-address-not-found-error";

type UpdateRestaurantAddressUseCaseRequest = {
  restaurant_id: string;
  body: UpdateRestaurantAddressRequest;
};

export class UpdateRestaurantAddressUseCase {
  constructor(
    private restaurantAddressesRepository: IRestaurantAddressesRepository,
    private restaurantRepository: IRestaurantsRepository
  ) {}

  async execute({
    restaurant_id,
    body
  }: UpdateRestaurantAddressUseCaseRequest): Promise<void> {

    const restaurantExists = await this.restaurantRepository.getById(restaurant_id);

    if (!restaurantExists) {
      throw new RestaurantNotFoundError();
    }

    const restaurantAddressExists = await this.restaurantAddressesRepository.getByRestaurantId(restaurant_id);

    if (!restaurantAddressExists) {
      throw new RestaurantAddressNotFoundError();
    }

    const { state, city, district, street, number } = body;

    await this.restaurantAddressesRepository.update(restaurant_id, {
      state,
      city,
      district,
      street,
      number
    });
  }
}
