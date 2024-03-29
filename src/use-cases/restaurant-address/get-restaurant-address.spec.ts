import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryRestaurantAddressRepository } from "@/repositories/in-memory/in-memory-restaurant-address-repository";
import { InMemoryRestaurantsRepository } from "@/repositories/in-memory/in-memory-restaurants-repository";
import { GetRestaurantAddressUseCase } from "./get-restaurant-address";

let restaurantsRepository: InMemoryRestaurantsRepository;
let restaurantAddressRepository: InMemoryRestaurantAddressRepository;
let sut: GetRestaurantAddressUseCase;

describe("Get Restaurant Address Use Case", () => {
  beforeEach(() => {
    restaurantsRepository = new InMemoryRestaurantsRepository();
    restaurantAddressRepository = new InMemoryRestaurantAddressRepository();
    sut = new GetRestaurantAddressUseCase(restaurantAddressRepository);
  });

  it("should be able to get restaurant address", async () => {
    await restaurantsRepository.create({
      name: "Frituras"
    });

    const { id: restaurant_id } = restaurantsRepository.restaurants[0];

    await restaurantAddressRepository.create({
      restaurant_id,
      city: "São Paulo",
      state: "SP",
      street: "Rua tal",
      district: "Algum bairro aí",
      number: 231,
      zip_code: "21223"
    });

    await restaurantAddressRepository.create({
      restaurant_id,
      city: "São Paulo",
      state: "SP",
      street: "Rua tal",
      district: "Algum bairro aí",
      number: 231,
      zip_code: "21223"
    });

    const { restaurantAddress } = await sut.execute({ restaurant_id });

    expect(restaurantAddress).toEqual(
      expect.objectContaining({
        restaurant_id
      })
    );

  });
});
