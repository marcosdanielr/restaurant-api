import { RestaurantAddress } from "@/models/restaurant-address-model";
import { IRestaurantAddressRepository } from "@/repositories/restaurant-address-repository";

export class CreateRestaurantAddressUseCase {
  constructor(private restaurantAdressRepository: IRestaurantAddressRepository) {}

  async execute({
    restaurant_id,
    street,
    district,
    number,
    zip_code
  }: RestaurantAddress): Promise<void> {

    await this.restaurantAdressRepository.create({
      restaurant_id,
      street,
      district,
      number,
      zip_code
    });
  }
}
