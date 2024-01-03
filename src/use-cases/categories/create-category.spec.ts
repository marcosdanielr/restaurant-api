import { InMemoryCategoriesRepository } from "@/repositories/in-memory/in-memory-categories-repository";
import { describe, it, expect, beforeEach } from "vitest";
import { CreateCategoryUseCase } from "./create-category";
import { InMemoryRestaurantsRepository } from "@/repositories/in-memory/in-memory-restaurants-repository";

let categoriesRepository: InMemoryCategoriesRepository;
let restaurantsRepository: InMemoryRestaurantsRepository;
let sut: CreateCategoryUseCase;

describe("Create Category Use Case", () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository();
    restaurantsRepository = new InMemoryRestaurantsRepository();

    sut = new CreateCategoryUseCase(categoriesRepository);
  });

  it("should be able to create category", async () => {

    await restaurantsRepository.create({
      name: "Salgados",
      address: "Avenida"
    });

    const { id: restaurant_id  } = restaurantsRepository.restaurants[0];

    await sut.execute(
      {
        restaurant_id,
        body: {
          name: "Almoço"
        }
      }
    );

    const category = categoriesRepository.categories[0];

    expect(category).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      })
    );

  });
});
