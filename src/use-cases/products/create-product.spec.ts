import { InMemoryIProductsRepository } from "@/repositories/in-memory/in-memory-products-repository";
import { describe, it, expect, beforeEach } from "vitest";
import { CreateProductUseCase } from "./create-product";
import { InMemoryIRestaurantsRepository } from "@/repositories/in-memory/in-memory-restaurants-repository";
import { InMemoryICategoriesRepository } from "@/repositories/in-memory/in-memory-categories-repository";

let IProductsRepository: InMemoryIProductsRepository;
let IRestaurantsRepository: InMemoryIRestaurantsRepository;
let ICategoriesRepository: InMemoryICategoriesRepository;
let sut: CreateProductUseCase;

describe("Create Product Use Case", () => {
  beforeEach(() => {
    IProductsRepository = new InMemoryIProductsRepository();
    IRestaurantsRepository = new InMemoryIRestaurantsRepository();
    ICategoriesRepository = new InMemoryICategoriesRepository();

    sut = new CreateProductUseCase(IProductsRepository);
  });

  it("should be able to create product", async () => {
    await IRestaurantsRepository.create({
      name: "Lanchonete",
      address: "Avenida",
    });

    const { id: restaurant_id } = IRestaurantsRepository.restaurants[0];

    await ICategoriesRepository.create(restaurant_id, {
      name: "Bebidas",
    });

    const { id: category_id } = ICategoriesRepository.categories[0];

    await sut.execute({
      restaurant_id,
      body: {
        name: "Monster",
        category_id,
        price: 9.5,
      },
    });

    const product = IProductsRepository.products[0];

    expect(product).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      }),
    );
  });
});
