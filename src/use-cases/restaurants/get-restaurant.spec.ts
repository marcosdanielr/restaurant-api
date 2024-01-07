import { InMemoryIRestaurantsRepository } from "@/repositories/in-memory/in-memory-restaurants-repository";
import { describe, it, expect, beforeEach } from "vitest";
import { GetRestaurantUseCase } from "./get-restaurant";

let restaurantsRepository: InMemoryIRestaurantsRepository;
let sut: GetRestaurantUseCase;

describe("Get Restaurant Use Case", () => {
  beforeEach(() => {
    restaurantsRepository = new InMemoryIRestaurantsRepository();
    sut = new GetRestaurantUseCase(restaurantsRepository);
  });

  it("should be able to get restaurant by id", async () => {

    await Promise.all(
      [
        restaurantsRepository.create({
          name: "Burguer",
          address: "Avenida",
        }),
        restaurantsRepository.create({
          name: "Lanchonete",
          address: "Avenida 2",
        })
      ]
    ); 


    const { restaurant } = await sut.execute({
      id: restaurantsRepository.restaurants[0].id
    });

    expect(restaurant).toEqual(restaurantsRepository.restaurants[0]);
  });
});
