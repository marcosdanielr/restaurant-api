import { UpdateProductRequest } from "@/models/products-model";
import { IProductsRepository } from "@/repositories/products-repository";

type UpdateProductUseCaseRequest = {
  restaurant_id: string;
  id: string;
  body: UpdateProductRequest
};

export class UpdateProductUseCase {
  constructor(private productsRepository: IProductsRepository) {}

  async execute({
    restaurant_id,
    id,
    body
  }: UpdateProductUseCaseRequest): Promise<void> {
    await this.productsRepository.update(restaurant_id, id, body);
  }
}
