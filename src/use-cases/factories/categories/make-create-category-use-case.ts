import { PostgreSQLCategoriesRepository } from "@/repositories/postgresql/postgresql-categories-repository";
import { CreateCategoryUseCase } from "@/use-cases/categories/create-category";

export function makeCreateCategoryUseCase() {
  const categoriesRepository = new PostgreSQLCategoriesRepository();
  const useCase = new CreateCategoryUseCase(categoriesRepository);

  return useCase;
}
