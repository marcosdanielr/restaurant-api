import { PostgreSQLOpeningHoursRepository } from "@/repositories/postgresql/postgresql-opening-hours-repository";
import { PostgreSQLRestaurantsRepository } from "@/repositories/postgresql/postgresql-restaurants-repository";
import { CreateOpeningHoursUseCase } from "@/use-cases/opening-hours/create-opening-hour";

export function makeCreateOpeningHourUseCase() {
  const productsRepository = new PostgreSQLOpeningHoursRepository();
  const restaurantRepository = new PostgreSQLRestaurantsRepository();

  const useCase = new CreateOpeningHoursUseCase(productsRepository, restaurantRepository);

  return useCase;
}
