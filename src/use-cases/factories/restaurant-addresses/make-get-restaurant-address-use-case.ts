import { PostgreSQLRestaurantAddressesRepository } from "@/repositories/postgresql/postgresql-restaurant-addresses-repository";
import { PostgreSQLRestaurantsRepository } from "@/repositories/postgresql/postgresql-restaurants-repository";
import { GetRestaurantAddressUseCase } from "@/use-cases/restaurant-addresses/get-restaurant-address";

export function makeGetRestaurantAddressUseCase() {
  const restaurantAddressesRepository = new PostgreSQLRestaurantAddressesRepository();
  const restaurantRepository = new PostgreSQLRestaurantsRepository();

  const useCase = new GetRestaurantAddressUseCase(restaurantAddressesRepository, restaurantRepository);

  return useCase;
}
