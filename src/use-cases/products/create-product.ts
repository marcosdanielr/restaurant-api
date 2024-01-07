import { CreateProductRequest } from "@/models/products-model";
import { ProductsRepository } from "@/repositories/products-repository";

type CreateProductUseCaseRequest = {
  restaurant_id: string;
  body: CreateProductRequest;
};

export class CreateProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    restaurant_id,
    body,
  }: CreateProductUseCaseRequest): Promise<void> {
    await this.productsRepository.create(restaurant_id, body);
  }
}
