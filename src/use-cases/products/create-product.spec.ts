import { InMemoryProductsRepository } from "@/repositories/in-memory/in-memory-products-repository";
import { describe, it, expect, beforeEach } from "vitest";
import { CreateProductUseCase } from "./create-product";
import { InMemoryRestaurantsRepository } from "@/repositories/in-memory/in-memory-restaurants-repository";
import { InMemoryCategoriesRepository } from "@/repositories/in-memory/in-memory-categories-repository";

let productsRepository: InMemoryProductsRepository;
let restaurantsRepository: InMemoryRestaurantsRepository;
let categoriesRepository: InMemoryCategoriesRepository;
let sut: CreateProductUseCase;

describe("Create Product Use Case", () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository();
    restaurantsRepository = new InMemoryRestaurantsRepository();
    categoriesRepository = new InMemoryCategoriesRepository();

    sut = new CreateProductUseCase(productsRepository);
  });

  it("should be able to create product", async () => {
    await restaurantsRepository.create({
      name: "Lanchonete",
      address: "Avenida",
    });

    const { id: restaurant_id } = restaurantsRepository.restaurants[0];

    await categoriesRepository.create(restaurant_id, {
      name: "Bebidas",
    });

    const { id: category_id } = categoriesRepository.categories[0];

    await sut.execute({
      restaurant_id,
      body: {
        name: "Monster",
        category_id,
        price: 9.5,
      },
    });

    const product = productsRepository.products[0];

    expect(product).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      }),
    );
  });
});
