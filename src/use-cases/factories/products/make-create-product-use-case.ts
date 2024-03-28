import { PostgreSQLProductsRepository } from "@/repositories/postgresql/postgresql-products-repository";
import { CreateProductUseCase } from "@/use-cases/products/create-product";

export function makeCreateProductUseCase() {
  const productsRepository = new PostgreSQLProductsRepository();
  const useCase = new CreateProductUseCase(productsRepository);

  return useCase;
}