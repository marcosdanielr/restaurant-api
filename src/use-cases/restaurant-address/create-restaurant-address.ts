import { RestaurantAddress } from "@/models/restaurant-address-model";
import { IRestaurantAddressRepository } from "@/repositories/restaurant-address-repository";
import { RestaurantAddressAlreadyExistsError } from "../errors/restaurant-address-already-exists-error";

export class CreateRestaurantAddressUseCase {
  constructor(private restaurantAdressRepository: IRestaurantAddressRepository) {}

  async execute({
    restaurant_id,
    city,
    state,
    street,
    district,
    number,
    zip_code
  }: RestaurantAddress): Promise<void> {

    const restaurantAddressExists = await this.restaurantAdressRepository.getByRestaurantId(restaurant_id);

    if (restaurantAddressExists) {
      throw new RestaurantAddressAlreadyExistsError();
    }

    await this.restaurantAdressRepository.create({
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
