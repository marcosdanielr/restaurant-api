import { describe, it, expect, beforeEach } from "vitest";
import { CreateRestaurantAddressUseCase } from "./create-restaurant-address";
import { InMemoryRestaurantsRepository } from "@/repositories/in-memory/in-memory-restaurants-repository";
import { RestaurantAddressAlreadyExistsError } from "../errors/restaurant-address-already-exists-error";
import { InMemoryRestaurantAddressesRepository } from "@/repositories/in-memory/in-memory-restaurant-addresses-repository";
import { RestaurantNotFoundError } from "../errors/restaurant-not-found-error";

let restaurantsRepository: InMemoryRestaurantsRepository;
let restaurantAddressRepository: InMemoryRestaurantAddressesRepository;
let sut: CreateRestaurantAddressUseCase;

describe("Create Restaurant Address Use Case", () => {
  beforeEach(() => {
    restaurantsRepository = new InMemoryRestaurantsRepository();
    restaurantAddressRepository = new InMemoryRestaurantAddressesRepository;
    sut = new CreateRestaurantAddressUseCase(restaurantAddressRepository, restaurantsRepository);
  });

  it("should be able to create restaurant address", async () => {
    await restaurantsRepository.create({
      name: "Frituras"
    });

    const { id: restaurant_id } = restaurantsRepository.restaurants[0];

    await sut.execute({
      restaurant_id,
      city: "São Paulo",
      state: "SP",
      street: "Rua tal",
      district: "Algum bairro aí",
      number: 231,
      zip_code: "21223"
    });

    const restaurantAddress = restaurantAddressRepository.restaurantsAdresses;

    expect(restaurantAddress.length).toEqual(1);
    expect(restaurantAddress[0]).toEqual(expect.objectContaining({
      id: expect.any(String), 
      created_at: expect.any(Date), 
    }));
  });


  it("shouldn't be able to create restaurant address if exists", async () => {
    await restaurantsRepository.create({
      name: "Frituras"
    });

    const { id: restaurant_id } = restaurantsRepository.restaurants[0];

    await sut.execute({
      restaurant_id,
      city: "São Paulo",
      state: "SP",
      street: "Rua tal",
      district: "Algum bairro aí",
      number: 231,
      zip_code: "21223"
    });

    await expect(() => 
      sut.execute({
        restaurant_id,
        city: "São Paulo",
        state: "SP",
        street: "Rua tal",
        district: "Algum outro bairro aí",
        number: 20,
        zip_code: "2123"
      })
    ).rejects.toBeInstanceOf(RestaurantAddressAlreadyExistsError);
  });

  it("shouldn't be able to create restaurant address if restaurant not exists", async () => {

    await expect(() => 
      sut.execute({
        restaurant_id: "123129dsi9ds2",
        city: "São Paulo",
        state: "SP",
        street: "Rua tal",
        district: "Algum outro bairro aí",
        number: 20,
        zip_code: "2123"
      })
    ).rejects.toBeInstanceOf(RestaurantNotFoundError);
  });
});
