import { PostgreSQLProductsRepository } from "@/repositories/postgresql/postgresql-products-repository";
import { CreateProductUseCase } from "@/use-cases/products/create-product";

export function makeCreateProductUseCase() {
  const restaurantsRepository = new PostgreSQLProductsRepository();
  const useCase = new CreateProductUseCase(restaurantsRepository);

  return useCase;
}
