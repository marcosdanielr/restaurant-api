import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryRestaurantsRepository } from "@/repositories/in-memory/in-memory-restaurants-repository";
import { GetRestaurantAddressUseCase } from "./get-restaurant-address";
import { InMemoryRestaurantAddressesRepository } from "@/repositories/in-memory/in-memory-restaurant-addresses-repository";
import { RestaurantNotFoundError } from "../errors/restaurant-not-found-error";

let restaurantsRepository: InMemoryRestaurantsRepository;
let restaurantAddressRepository: InMemoryRestaurantAddressesRepository;
let sut: GetRestaurantAddressUseCase;

describe("Get Restaurant Address Use Case", () => {
  beforeEach(() => {
    restaurantsRepository = new InMemoryRestaurantsRepository();
    restaurantAddressRepository = new InMemoryRestaurantAddressesRepository();
    sut = new GetRestaurantAddressUseCase(restaurantAddressRepository, restaurantsRepository);
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
      number: "231",
    });

    await restaurantAddressRepository.create({
      restaurant_id,
      city: "São Paulo",
      state: "SP",
      street: "Rua tal",
      district: "Algum bairro aí",
      number: "231",
    });

    const { restaurantAddress } = await sut.execute({ restaurant_id });

    expect(restaurantAddress).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        restaurant_id,
        created_at: expect.any(Date)
      })
    );
  });

  it("shouldn't be able to get address if restaurant not exists", async () => {
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
      number: "231",
    });

    await restaurantAddressRepository.create({
      restaurant_id,
      city: "São Paulo",
      state: "SP",
      street: "Rua tal",
      district: "Algum bairro aí",
      number: "231",
    });

    await expect(() => 
      sut.execute({ restaurant_id })
    ).rejects.toBeInstanceOf(RestaurantNotFoundError);

  });
});
