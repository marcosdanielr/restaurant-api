import { PostgreSQLRestaurantsRepository } from "@/repositories/postgresql/postgresql-restaurants-repository";
import { UpdateRestaurantUseCase } from "@/use-cases/restaurants/update-restaurant";

export function makeUpdateRestaurantUseCase() {
  const restaurantsRepository = new PostgreSQLRestaurantsRepository();
  const useCase = new UpdateRestaurantUseCase(restaurantsRepository);

  return useCase;
}
