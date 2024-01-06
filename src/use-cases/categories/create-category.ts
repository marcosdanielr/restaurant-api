import { CategoriesRepository } from "@/repositories/categories-repository";
import { CategoryInput } from "@/types/repositories/categories-repository";

type CreateCategoryUseCaseRequest = {
  restaurant_id: string;
  body: CategoryInput
}

export class CreateCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute({
    restaurant_id,
    body
  }: CreateCategoryUseCaseRequest): Promise<void> {

    await this.categoriesRepository.create(restaurant_id, body);
  }
}
