import { Category } from "@/models/categories-model";
import { ICategoriesRepository } from "@/repositories/categories-repository";

type ListCategoriesUseCaseRequest = {
  restaurant_id: string;
}

type ListCategoriesUseCaseResponse = {
  categories: Category[]
}

export class ListCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute({
    restaurant_id
  }: ListCategoriesUseCaseRequest): Promise<ListCategoriesUseCaseResponse> {

    const categories = await this.categoriesRepository.list(restaurant_id);

    return {
      categories
    };
  }
}
