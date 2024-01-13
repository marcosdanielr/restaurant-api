import { PostgreSQLRestaurantsRepository } from "@/repositories/postgresql/postgresql-restaurants-repository";
import { ListRestaurantsUseCase } from "@/use-cases/restaurants/list-restaurants";

export function makeListRestaurantsUseCase() {
  const restaurantsRepository = new PostgreSQLRestaurantsRepository();
  const useCase = new ListRestaurantsUseCase(restaurantsRepository);

  return useCase;
}
