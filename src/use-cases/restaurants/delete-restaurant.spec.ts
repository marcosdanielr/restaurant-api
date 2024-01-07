import { InMemoryIRestaurantsRepository } from "@/repositories/in-memory/in-memory-restaurants-repository";
import { describe, it, expect, beforeEach } from "vitest";
import { DeleteRestaurantUseCase } from "./delete-restaurant";

let IRestaurantsRepository: InMemoryIRestaurantsRepository;
let sut: DeleteRestaurantUseCase;

describe("Delete Restaurant Use Case", () => {
  beforeEach(() => {
    IRestaurantsRepository = new InMemoryIRestaurantsRepository();
    sut = new DeleteRestaurantUseCase(IRestaurantsRepository);
  });

  it("should be able to delete restaurant", async () => {

    for (let i = 0; i < 5; i++) {
      await IRestaurantsRepository.create({
        name: `Restaurante ${i}`,
        address: `Avenida ${i}`
      });
    }

    const restaurantId = IRestaurantsRepository.restaurants[2].id;

    await sut.execute({
      id: restaurantId
    });

    const restaurant =  await IRestaurantsRepository.getById(restaurantId);

    expect(restaurant).toEqual(null);
    expect(IRestaurantsRepository.restaurants.length).toEqual(4);
  });
});
