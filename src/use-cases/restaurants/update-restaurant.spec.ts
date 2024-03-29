import { InMemoryRestaurantsRepository } from "@/repositories/in-memory/in-memory-restaurants-repository";
import { describe, it, expect, beforeEach } from "vitest";
import { UpdateRestaurantUseCase } from "./update-restaurant";
import { RestaurantNotFoundError } from "../errors/restaurant-not-found-error";

let restaurantsRepository: InMemoryRestaurantsRepository;
let sut: UpdateRestaurantUseCase;

describe("Update Restaurant Use Case", () => {
  beforeEach(() => {
    restaurantsRepository = new InMemoryRestaurantsRepository();
    sut = new UpdateRestaurantUseCase(restaurantsRepository);
  });

  it("should be able to update restaurant", async () => {
    await restaurantsRepository.create({
      name: "Restaurante do Zé",
    });

    const restaurantId = restaurantsRepository.restaurants[0].id;

    await sut.execute({
      id: restaurantId, 
      body: {
        name: "Rações do Ludi"
      }});

    const restaurant =  await restaurantsRepository.getById(restaurantId);

    expect(restaurant).toEqual(
      expect.objectContaining({
        name: "Rações do Ludi",
      })
    );
  });

  it("should not be able to update restaurant if not exists", async () => {
    await expect(() => 
      sut.execute({
        id: "2231231dsa3", 
        body: {
          name: "Rações do Ludi"
        }})
    ).rejects.toBeInstanceOf(RestaurantNotFoundError);
  });
});
