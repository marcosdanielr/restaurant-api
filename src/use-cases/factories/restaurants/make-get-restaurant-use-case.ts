import { PostgreSQLRestaurantsRepository } from "@/repositories/postgresql/postgresql-restaurants-repository";
import { GetRestaurantUseCase } from "@/use-cases/restaurants/get-restaurant";

export function makeGetRestaurantUseCase() {
  const restaurantsRepository = new PostgreSQLRestaurantsRepository();
  const useCase = new GetRestaurantUseCase(restaurantsRepository);

  return useCase;
}
