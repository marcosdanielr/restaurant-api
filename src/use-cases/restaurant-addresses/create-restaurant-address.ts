import { CreateRestaurantAddressRequest } from "@/models/restaurant-addresses-model";
import { RestaurantAddressAlreadyExistsError } from "../errors/restaurant-address-already-exists-error";
import { IRestaurantAddressesRepository } from "@/repositories/restaurant-addresses-repository";

export class CreateRestaurantAddressUseCase {
  constructor(private restaurantAddressesRepository: IRestaurantAddressesRepository) {}

  async execute({
    restaurant_id,
    city,
    state,
    street,
    district,
    number,
    zip_code
  }: CreateRestaurantAddressRequest): Promise<void> {

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
