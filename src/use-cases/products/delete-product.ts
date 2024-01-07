import { IProductsRepository } from "@/repositories/products-repository";

type DeleteProductUseCaseRequest = {
  restaurant_id: string;
  id: string;
};

export class DeleteProductUseCase {
  constructor(private productsRepository: IProductsRepository) {}

  async execute({
    restaurant_id,
    id
  }: DeleteProductUseCaseRequest): Promise<void> {
    await this.productsRepository.delete(restaurant_id, id);
  }
}
