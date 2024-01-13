import { PostgreSQLRestaurantsRepository } from "@/repositories/postgresql/postgresql-restaurants-repository";
import { CreateRestaurantUseCase } from "../restaurants/create-restaurant";

export function makeCreateRestaurantseCase() {
  const restaurantsRepository = new PostgreSQLRestaurantsRepository();
  const useCase = new CreateRestaurantUseCase(restaurantsRepository);

  return useCase;
}
