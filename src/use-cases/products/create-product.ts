import { CreateProductRequest } from "@/models/products-model";
import { IProductsRepository } from "@/repositories/products-repository";
import { IRestaurantsRepository } from "@/repositories/restaurants-repository";
import { RestaurantNotFoundError } from "../errors/restaurant-not-found-error";

type CreateProductUseCaseRequest = {
  restaurant_id: string;
  body: CreateProductRequest;
};

export class CreateProductUseCase {
  constructor(
    private productsRepository: IProductsRepository,
    private restaurantRepository: IRestaurantsRepository
  ) {}

  async execute({
    restaurant_id,
    body,
  }: CreateProductUseCaseRequest): Promise<void> {

    const restaurantExists = await this.restaurantRepository.getById(restaurant_id);

    if (!restaurantExists) {
      throw new RestaurantNotFoundError();
    }

    await this.productsRepository.create(restaurant_id, body);
  }
}
