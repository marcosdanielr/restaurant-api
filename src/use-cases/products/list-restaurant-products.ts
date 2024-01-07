import { Product } from "@/models/products-model";
import { ProductsRepository } from "@/repositories/products-repository";

type ListRestaurantProductsUseCaseRequest = {
  restaurant_id: string;
};

type ListRestaurantProductsUseCaseResponse = {
  products: Product[]
};

export class ListRestaurantProductsUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({ restaurant_id }: ListRestaurantProductsUseCaseRequest): Promise<ListRestaurantProductsUseCaseResponse> {
    const products = await this.productsRepository.listRestaurantProducts(restaurant_id);

    return {
      products
    };
  }
}
