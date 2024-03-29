import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryRestaurantAddressRepository } from "@/repositories/in-memory/in-memory-restaurant-address-repository";
import { CreateRestaurantAddressUseCase } from "./create-restaurant-address";
import { InMemoryRestaurantsRepository } from "@/repositories/in-memory/in-memory-restaurants-repository";
import { RestaurantAddressAlreadyExistsError } from "../errors/restaurant-address-already-exists-error";

let restaurantsRepository: InMemoryRestaurantsRepository;
let restaurantAddressRepository: InMemoryRestaurantAddressRepository;
let sut: CreateRestaurantAddressUseCase;

describe("Create Restaurant Address Use Case", () => {
  beforeEach(() => {
    restaurantsRepository = new InMemoryRestaurantsRepository();
    restaurantAddressRepository = new InMemoryRestaurantAddressRepository();
    sut = new CreateRestaurantAddressUseCase(restaurantAddressRepository);
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
});
