import { CreateRestaurantAddressRequest } from "@/models/restaurant-addresses-model";
import { RestaurantAddressAlreadyExistsError } from "../errors/restaurant-address-already-exists-error";
import { IRestaurantAddressesRepository } from "@/repositories/restaurant-addresses-repository";
import { IRestaurantsRepository } from "@/repositories/restaurants-repository";
import { RestaurantNotFoundError } from "../errors/restaurant-not-found-error";

export class CreateRestaurantAddressUseCase {
  constructor(
    private restaurantAddressesRepository: IRestaurantAddressesRepository,
    private restaurantRepository: IRestaurantsRepository
  ) {}

  async execute({
    restaurant_id,
    city,
    state,
    street,
    district,
    number,
    zip_code
  }: CreateRestaurantAddressRequest): Promise<void> {

    const restaurantExists = await this.restaurantRepository.getById(restaurant_id);

    if (!restaurantExists) {
      throw new RestaurantNotFoundError();
    }

    const restaurantAddressExists = await this.restaurantAddressesRepository.getByRestaurantId(restaurant_id);

    if (restaurantAddressExists) {
      throw new RestaurantAddressAlreadyExistsError();
    }

    await this.restaurantAddressesRepository.create({
      restaurant_id,
      city,
      state,
      street,
      district,
      number,
      zip_code
    });
  }
}
