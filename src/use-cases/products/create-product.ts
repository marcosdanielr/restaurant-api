import { CreateProductRequest } from "@/models/products-model";
import { IProductsRepository } from "@/repositories/products-repository";
import { IRestaurantsRepository } from "@/repositories/restaurants-repository";
import { RestaurantNotFoundError } from "../errors/restaurant-not-found-error";
import { ICategoriesRepository } from "@/repositories/categories-repository";
import { CategoryNotFoundError } from "../errors/category-not-found-error";

type CreateProductUseCaseRequest = {
  restaurant_id: string;
  body: CreateProductRequest;
};

export class CreateProductUseCase {
  constructor(
    private productsRepository: IProductsRepository,
    private restaurantRepository: IRestaurantsRepository,
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({
    restaurant_id,
    body,
  }: CreateProductUseCaseRequest): Promise<void> {

    const restaurantExists = await this.restaurantRepository.getById(restaurant_id);

    if (!restaurantExists) {
      throw new RestaurantNotFoundError();
    }

    const categoryExists = await this.categoriesRepository.getById(body.category_id);

    if (!categoryExists) {
      throw new CategoryNotFoundError();
    }

    await this.productsRepository.create(restaurant_id, body);
  }
}
