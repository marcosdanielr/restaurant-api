import { InMemoryIRestaurantsRepository } from "@/repositories/in-memory/in-memory-restaurants-repository";
import { describe, it, expect, beforeEach } from "vitest";
import { CreateRestaurantUseCase } from "./create-restaurant";

let IRestaurantsRepository: InMemoryIRestaurantsRepository;
let sut: CreateRestaurantUseCase;

describe("Create Restaurant Use Case", () => {
  beforeEach(() => {
    IRestaurantsRepository = new InMemoryIRestaurantsRepository();
    sut = new CreateRestaurantUseCase(IRestaurantsRepository);
  });

  it("should be able to create restaurant", async () => {
    await sut.execute({
      name: "The Burguer",
      address: "Avenida tal",
    });

    expect(IRestaurantsRepository.restaurants).toEqual([
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
