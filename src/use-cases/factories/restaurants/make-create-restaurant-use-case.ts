import { PostgreSQLRestaurantsRepository } from "@/repositories/postgresql/postgresql-restaurants-repository";
import { CreateRestaurantUseCase } from "@/use-cases/restaurants/create-restaurant";

export function makeCreateRestaurantUseCase() {
  const restaurantsRepository = new PostgreSQLRestaurantsRepository();
  const useCase = new CreateRestaurantUseCase(restaurantsRepository);

  return useCase;
}
