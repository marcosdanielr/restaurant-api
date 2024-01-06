import { ProductsRepository } from "@/repositories/products-repository";
import { UpdateProductInput } from "@/types/repositories/products-repository";

type UpdateProductUseCaseRequest = {
  restaurant_id: string;
  id: string;
  body: UpdateProductInput
};

export class UpdateProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    restaurant_id,
    id,
    body
  }: UpdateProductUseCaseRequest): Promise<void> {
    await this.productsRepository.update(restaurant_id, id, body);
  }
}
