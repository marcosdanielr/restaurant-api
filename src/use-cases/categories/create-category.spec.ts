import { InMemoryICategoriesRepository } from "@/repositories/in-memory/in-memory-categories-repository";
import { describe, it, expect, beforeEach } from "vitest";
import { CreateCategoryUseCase } from "./create-category";
import { InMemoryIRestaurantsRepository } from "@/repositories/in-memory/in-memory-restaurants-repository";

let ICategoriesRepository: InMemoryICategoriesRepository;
let IRestaurantsRepository: InMemoryIRestaurantsRepository;
let sut: CreateCategoryUseCase;

describe("Create Category Use Case", () => {
  beforeEach(() => {
    ICategoriesRepository = new InMemoryICategoriesRepository();
    IRestaurantsRepository = new InMemoryIRestaurantsRepository();

    sut = new CreateCategoryUseCase(ICategoriesRepository);
  });

  it("should be able to create category", async () => {

    await IRestaurantsRepository.create({
      name: "Salgados",
      address: "Avenida"
    });

    const { id: restaurant_id  } = IRestaurantsRepository.restaurants[0];

    await sut.execute(
      {
        restaurant_id,
        body: {
          name: "Almoço"
        }
      }
    );

    const category = ICategoriesRepository.categories[0];

    expect(category).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      })
    );

  });
});
