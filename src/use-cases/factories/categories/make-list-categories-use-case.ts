import { PostgreSQLCategoriesRepository } from "@/repositories/postgresql/postgresql-categories-repository";
import { ListCategoriesUseCase } from "@/use-cases/categories/list-categories";

export function makeListCategoriesUseCase() {
  const categoriesRepository = new PostgreSQLCategoriesRepository();
  const useCase = new ListCategoriesUseCase(categoriesRepository);

  return useCase;
}
