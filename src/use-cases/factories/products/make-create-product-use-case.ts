import { PostgreSQLProductsRepository } from "@/repositories/postgresql/postgresql-products-repository";
import { PostgreSQLRestaurantsRepository } from "@/repositories/postgresql/postgresql-restaurants-repository";
import { CreateProductUseCase } from "@/use-cases/products/create-product";

export function makeCreateProductUseCase() {
  const productsRepository = new PostgreSQLProductsRepository();
  const restaurantRepository = new PostgreSQLRestaurantsRepository();

  const useCase = new CreateProductUseCase(productsRepository, restaurantRepository);

  return useCase;
}
