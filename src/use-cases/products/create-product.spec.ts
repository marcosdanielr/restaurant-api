import { InMemoryIProductsRepository } from "@/repositories/in-memory/in-memory-products-repository";
import { describe, it, expect, beforeEach } from "vitest";
import { CreateProductUseCase } from "./create-product";
import { InMemoryIRestaurantsRepository } from "@/repositories/in-memory/in-memory-restaurants-repository";
import { InMemoryICategoriesRepository } from "@/repositories/in-memory/in-memory-categories-repository";

let productsRepository: InMemoryIProductsRepository;
let restaurantsRepository: InMemoryIRestaurantsRepository;
let categoriesRepository: InMemoryICategoriesRepository;
let sut: CreateProductUseCase;

describe("Create Product Use Case", () => {
  beforeEach(() => {
    productsRepository = new InMemoryIProductsRepository();
    restaurantsRepository = new InMemoryIRestaurantsRepository();
    categoriesRepository = new InMemoryICategoriesRepository();

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
