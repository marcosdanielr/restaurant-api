import { Product } from "@/models/products-model";
import { IProductsRepository } from "@/repositories/products-repository";
import { IRestaurantsRepository } from "@/repositories/restaurants-repository";
import { RestaurantNotFoundError } from "../errors/restaurant-not-found-error";

type ListRestaurantProductsUseCaseRequest = {
  restaurant_id: string;
};

type ListRestaurantProductsUseCaseResponse = {
  products: Product[]
};

export class ListRestaurantProductsUseCase {
  constructor(
    private productsRepository: IProductsRepository,
    private restaurantRepository: IRestaurantsRepository
  ) {}

  async execute({ restaurant_id }: ListRestaurantProductsUseCaseRequest): Promise<ListRestaurantProductsUseCaseResponse> {

    const restaurantExists = await this.restaurantRepository.getById(restaurant_id);

    if (!restaurantExists) {
      throw new RestaurantNotFoundError();
    }

    const products = await this.productsRepository.listByRestaurantId(restaurant_id);

    return {
      products
    };
  }
}
