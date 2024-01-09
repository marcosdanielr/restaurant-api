import { InMemoryRestaurantsRepository } from "@/repositories/in-memory/in-memory-restaurants-repository";
import { describe, it, expect, beforeEach } from "vitest";
import { ListRestaurantsUseCase } from "./list-restaurants";

let restaurantsRepository: InMemoryRestaurantsRepository;
let sut: ListRestaurantsUseCase;

describe("List Restaurants Use Case", () => {
  beforeEach(() => {
    restaurantsRepository = new InMemoryRestaurantsRepository();
    sut = new ListRestaurantsUseCase(restaurantsRepository);
  });

  it("should be able to list restaurants", async () => {

    await Promise.all(
      [
        restaurantsRepository.create({
          name: "Burguer",
        }),
        restaurantsRepository.create({
          name: "Lanchonete",
        })
      ]
    ); 


    const { restaurants } = await sut.execute();

    expect(restaurants).toEqual([
      expect.objectContaining({
        id: expect.any(String),
        name: "Burguer",
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      }),
      expect.objectContaining({
        id: expect.any(String),
        name: "Lanchonete",
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      }),
    ]);

    expect(restaurants.length).toEqual(2);
  });
});
