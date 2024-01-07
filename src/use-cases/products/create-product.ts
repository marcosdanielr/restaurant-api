import { CreateProductRequest } from "@/models/products-model";
import { IProductsRepository } from "@/repositories/products-repository";

type CreateProductUseCaseRequest = {
  restaurant_id: string;
  body: CreateProductRequest;
};

export class CreateProductUseCase {
  constructor(private IProductsRepository: IProductsRepository) {}

  async execute({
    restaurant_id,
    body,
  }: CreateProductUseCaseRequest): Promise<void> {
    await this.IProductsRepository.create(restaurant_id, body);
  }
}
