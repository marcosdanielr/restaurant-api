import { InMemoryRestaurantsRepository } from "@/repositories/in-memory/in-memory-restaurants-repository";
import { describe, it, expect, beforeEach } from "vitest";
import { DeleteRestaurantUseCase } from "./delete-restaurant";
import { RestaurantNotFoundError } from "../errors/restaurant-not-found-error";

let restaurantsRepository: InMemoryRestaurantsRepository;
let sut: DeleteRestaurantUseCase;

describe("Delete Restaurant Use Case", () => {
  beforeEach(() => {
    restaurantsRepository = new InMemoryRestaurantsRepository();
    sut = new DeleteRestaurantUseCase(restaurantsRepository);
  });

  it("should be able to delete restaurant", async () => {

    for (let i = 0; i < 5; i++) {
      await restaurantsRepository.create({
        name: `Restaurante ${i}`,
      });
    }

    const restaurantId = restaurantsRepository.restaurants[2].id;

    await sut.execute({
      id: restaurantId
    });

    const restaurant =  await restaurantsRepository.getById(restaurantId);

    expect(restaurant).toEqual(null);
    expect(restaurantsRepository.restaurants.length).toEqual(4);
  });


  it("should not be able to delete restaurant if not exists", async () => {
    await expect(() => 
      sut.execute({
        id: "1233290dsd"
      }))
      .rejects.toBeInstanceOf(RestaurantNotFoundError);
  });
});
