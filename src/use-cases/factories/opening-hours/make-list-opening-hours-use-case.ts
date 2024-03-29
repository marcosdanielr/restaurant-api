import { PostgreSQLOpeningHoursRepository } from "@/repositories/postgresql/postgresql-opening-hours-repository";
import { PostgreSQLRestaurantsRepository } from "@/repositories/postgresql/postgresql-restaurants-repository";
import { ListOpeningHoursUseCase } from "@/use-cases/opening-hours/list-opening-hours";

export function makeListOpeningHoursUseCase() {
  const productsRepository = new PostgreSQLOpeningHoursRepository();
  const restaurantRepository = new PostgreSQLRestaurantsRepository();

  const useCase = new ListOpeningHoursUseCase(productsRepository, restaurantRepository);

  return useCase;
}
