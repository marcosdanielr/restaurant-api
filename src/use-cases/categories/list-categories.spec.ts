import { InMemoryCategoriesRepository } from "@/repositories/in-memory/in-memory-categories-repository";
import { describe, it, expect, beforeEach } from "vitest";
import { ListCategoriesUseCase } from "./list-categories";
import { InMemoryRestaurantsRepository } from "@/repositories/in-memory/in-memory-restaurants-repository";

let categoriesRepository: InMemoryCategoriesRepository;
let restaurantsRepository: InMemoryRestaurantsRepository;
let sut: ListCategoriesUseCase;

describe("List Categories Use Case", () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository();
    restaurantsRepository = new InMemoryRestaurantsRepository();

    sut = new ListCategoriesUseCase(categoriesRepository);
  });

  it("should be able to list categories", async () => {

    await restaurantsRepository.create({
      name: "Salgados",
    });

    const { id: restaurant_id  } = restaurantsRepository.restaurants[0];

    await categoriesRepository.create(restaurant_id, {
      name: "Bebida"
    });

    await categoriesRepository.create(restaurant_id, {
      name: "Lanche"
    });

    const { categories } = await sut.execute({
      restaurant_id
    });

    expect(categories.length).toEqual(2);

    expect(categories).toEqual([
      expect.objectContaining({
        id: expect.any(String),
        name: "Bebida",
        created_at: expect.any(Date),
      }),
      expect.objectContaining({
        id: expect.any(String),
        name: "Lanche",
        created_at: expect.any(Date),
      }),
    ]);
  });
});
