import { InMemoryIRestaurantsRepository } from "@/repositories/in-memory/in-memory-restaurants-repository";
import { describe, it, expect, beforeEach } from "vitest";
import { CreateRestaurantUseCase } from "./create-restaurant";

let restaurantsRepository: InMemoryIRestaurantsRepository;
let sut: CreateRestaurantUseCase;

describe("Create Restaurant Use Case", () => {
  beforeEach(() => {
    restaurantsRepository = new InMemoryIRestaurantsRepository();
    sut = new CreateRestaurantUseCase(restaurantsRepository);
  });

  it("should be able to create restaurant", async () => {
    await sut.execute({
      name: "The Burguer",
      address: "Avenida tal",
    });

    expect(restaurantsRepository.restaurants).toEqual([
      expect.objectContaining({
        id: expect.any(String),
        name: "The Burguer",
        address: "Avenida tal",
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      })
    ]);
  });
});
