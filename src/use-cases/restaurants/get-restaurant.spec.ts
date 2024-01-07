import { InMemoryIRestaurantsRepository } from "@/repositories/in-memory/in-memory-restaurants-repository";
import { describe, it, expect, beforeEach } from "vitest";
import { GetRestaurantUseCase } from "./get-restaurant";

let IRestaurantsRepository: InMemoryIRestaurantsRepository;
let sut: GetRestaurantUseCase;

describe("Get Restaurant Use Case", () => {
  beforeEach(() => {
    IRestaurantsRepository = new InMemoryIRestaurantsRepository();
    sut = new GetRestaurantUseCase(IRestaurantsRepository);
  });

  it("should be able to get restaurant by id", async () => {

    await Promise.all(
      [
        IRestaurantsRepository.create({
          name: "Burguer",
          address: "Avenida",
        }),
        IRestaurantsRepository.create({
          name: "Lanchonete",
          address: "Avenida 2",
        })
      ]
    ); 


    const { restaurant } = await sut.execute({
      id: IRestaurantsRepository.restaurants[0].id
    });

    expect(restaurant).toEqual(IRestaurantsRepository.restaurants[0]);
  });
});
