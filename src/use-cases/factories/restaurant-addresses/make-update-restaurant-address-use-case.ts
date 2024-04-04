import { PostgreSQLRestaurantAddressesRepository } from "@/repositories/postgresql/postgresql-restaurant-addresses-repository";
import { PostgreSQLRestaurantsRepository } from "@/repositories/postgresql/postgresql-restaurants-repository";
import { UpdateRestaurantAddressUseCase } from "@/use-cases/restaurant-addresses/update-restaurant-address";

export function makeUpdateRestaurantAddressUseCase() {
  const restaurantAddressesRepository = new PostgreSQLRestaurantAddressesRepository();
  const restaurantRepository = new PostgreSQLRestaurantsRepository();

  const useCase = new UpdateRestaurantAddressUseCase(restaurantAddressesRepository, restaurantRepository);

  return useCase;
}
