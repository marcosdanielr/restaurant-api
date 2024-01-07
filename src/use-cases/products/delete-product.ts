import { IProductsRepository } from "@/repositories/products-repository";

type DeleteProductUseCaseRequest = {
  restaurant_id: string;
  id: string;
};

export class DeleteProductUseCase {
  constructor(private IProductsRepository: IProductsRepository) {}

  async execute({
    restaurant_id,
    id
  }: DeleteProductUseCaseRequest): Promise<void> {
    await this.IProductsRepository.delete(restaurant_id, id);
  }
}
