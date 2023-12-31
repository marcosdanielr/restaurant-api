import { CategoryRequest } from "@/models/categories-model";
import { ICategoriesRepository } from "@/repositories/categories-repository";

type CreateCategoryUseCaseRequest = {
  restaurant_id: string;
  body: CategoryRequest
}

export class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute({
    restaurant_id,
    body
  }: CreateCategoryUseCaseRequest): Promise<void> {

    await this.categoriesRepository.create(restaurant_id, body);
  }
}
