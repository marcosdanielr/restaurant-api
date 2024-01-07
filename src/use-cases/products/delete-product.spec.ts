import { InMemoryIProductsRepository } from "@/repositories/in-memory/in-memory-products-repository";
import { describe, it, expect, beforeEach } from "vitest";
import { DeleteProductUseCase } from "./delete-product";
import { InMemoryIRestaurantsRepository } from "@/repositories/in-memory/in-memory-restaurants-repository";
import { InMemoryICategoriesRepository } from "@/repositories/in-memory/in-memory-categories-repository";

let IProductsRepository: InMemoryIProductsRepository;
let IRestaurantsRepository: InMemoryIRestaurantsRepository;
let ICategoriesRepository: InMemoryICategoriesRepository;
let sut: DeleteProductUseCase;

describe("Delete Product Use Case", () => {
  beforeEach(() => {
    IProductsRepository = new InMemoryIProductsRepository();
    IRestaurantsRepository = new InMemoryIRestaurantsRepository();
    ICategoriesRepository = new InMemoryICategoriesRepository();

    sut = new DeleteProductUseCase(IProductsRepository);
  });

  it("should be able to delete product", async () => {

    await IRestaurantsRepository.create({
      name: "Lanchonete",
      address: "Avenida",
    });

    const { id: restaurant_id } = IRestaurantsRepository.restaurants[0];

    await ICategoriesRepository.create(restaurant_id, {
      name: "Bebidas",
    });

    const { id: category_id } = ICategoriesRepository.categories[0];

    await IProductsRepository.create(restaurant_id, {
      name: "Monster",
      category_id: category_id,
      price: 9.50
    });

    const product = IProductsRepository.products[0];

    await sut.execute({
      restaurant_id,
      id: product.id
    });

    expect(IProductsRepository.products.length).toEqual(0);
  });
});
