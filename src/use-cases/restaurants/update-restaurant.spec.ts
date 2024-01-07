import { InMemoryIRestaurantsRepository } from "@/repositories/in-memory/in-memory-restaurants-repository";
import { describe, it, expect, beforeEach } from "vitest";
import { UpdateRestaurantUseCase } from "./update-restaurant";

let IRestaurantsRepository: InMemoryIRestaurantsRepository;
let sut: UpdateRestaurantUseCase;

describe("Update Restaurant Use Case", () => {
  beforeEach(() => {
    IRestaurantsRepository = new InMemoryIRestaurantsRepository();
    sut = new UpdateRestaurantUseCase(IRestaurantsRepository);
  });

  it("should be able to update restaurant", async () => {
    await IRestaurantsRepository.create({
      name: "Restaurante do Zé",
      address: "Avenida"
    });

    const restaurantId = IRestaurantsRepository.restaurants[0].id;

    await sut.execute({
      id: restaurantId, 
      body: {
        name: "Rações do Ludi"
      }});

    const restaurant =  await IRestaurantsRepository.getById(restaurantId);

    expect(restaurant).toEqual(
      expect.objectContaining({
        name: "Rações do Ludi",
      })
    );
  });
});
