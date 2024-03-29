import { PostgreSQLRestaurantAddressesRepository } from "@/repositories/postgresql/postgresql-restaurant-addresses-repository";
import { PostgreSQLRestaurantsRepository } from "@/repositories/postgresql/postgresql-restaurants-repository";
import { CreateRestaurantAddressUseCase } from "@/use-cases/restaurant-addresses/create-restaurant-address";

export function makeCreateRestaurantAddressUseCase() {
  const restaurantAddressesRepository = new PostgreSQLRestaurantAddressesRepository();
  const restaurantRepository = new PostgreSQLRestaurantsRepository();

  const useCase = new CreateRestaurantAddressUseCase(restaurantAddressesRepository, restaurantRepository);

  return useCase;
}
