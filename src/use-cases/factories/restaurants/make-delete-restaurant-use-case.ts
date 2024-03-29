import { PostgreSQLRestaurantsRepository } from "@/repositories/postgresql/postgresql-restaurants-repository";
import { DeleteRestaurantUseCase } from "@/use-cases/restaurants/delete-restaurant";

export function makeDeleteRestaurantUseCase() {
  const restaurantsRepository = new PostgreSQLRestaurantsRepository();
  const useCase = new DeleteRestaurantUseCase(restaurantsRepository);

  return useCase;
}
