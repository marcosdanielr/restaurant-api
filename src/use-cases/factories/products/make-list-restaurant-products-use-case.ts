import { PostgreSQLProductsRepository } from "@/repositories/postgresql/postgresql-products-repository";
import { PostgreSQLRestaurantsRepository } from "@/repositories/postgresql/postgresql-restaurants-repository";
import { ListRestaurantProductsUseCase } from "@/use-cases/products/list-restaurant-products";

export function makeListRestaurantProductsUseCase() {
  const productsRepository = new PostgreSQLProductsRepository();
  const restaurantRepository = new PostgreSQLRestaurantsRepository();

  const useCase = new ListRestaurantProductsUseCase(productsRepository, restaurantRepository);

  return useCase;
}
