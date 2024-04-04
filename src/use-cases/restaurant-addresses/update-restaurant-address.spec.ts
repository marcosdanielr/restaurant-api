import { describe, it, expect, beforeEach } from "vitest";
import { UpdateRestaurantAddressUseCase } from "./update-restaurant-address";
import { InMemoryRestaurantsRepository } from "@/repositories/in-memory/in-memory-restaurants-repository";
import { InMemoryRestaurantAddressesRepository } from "@/repositories/in-memory/in-memory-restaurant-addresses-repository";
import { RestaurantNotFoundError } from "../errors/restaurant-not-found-error";

let restaurantsRepository: InMemoryRestaurantsRepository;
let restaurantAddressRepository: InMemoryRestaurantAddressesRepository;
let sut: UpdateRestaurantAddressUseCase;

describe("Update Restaurant Address Use Case", () => {
  beforeEach(() => {
    restaurantsRepository = new InMemoryRestaurantsRepository();
    restaurantAddressRepository = new InMemoryRestaurantAddressesRepository;
    sut = new UpdateRestaurantAddressUseCase(restaurantAddressRepository, restaurantsRepository);
  });

  it("should be able to update restaurant address", async () => {

    await restaurantsRepository.create({
      name: "Salgados",
      image_path: "image.png"
    });

    const [restaurant] = restaurantsRepository.restaurants;

    restaurantAddressRepository.create({
      restaurant_id: restaurant.id,
      state: "SP",
      city: "São Paulo",
      district: "blabla",
      street: "Rua",
      number: "221"
    });

    const [restaurantAddress] = restaurantAddressRepository.restaurantsAdresses;

    await sut.execute({
      restaurant_id: restaurant.id,
      body: {
        city: "São Paulo", state: "SP",
        street: "Rua tal",
        district: "Algum bairro aí",
        number: "231"
      }
    });

    const [restaurantAddressUpdated] = restaurantAddressRepository.restaurantsAdresses;

    expect(restaurantAddressUpdated).toEqual(expect.objectContaining({
      id: restaurantAddress.id, 
      city: "São Paulo",
      state: "SP",
      street: "Rua tal",
      district: "Algum bairro aí",
      number: "231"
    }));
  });

  it("shouldn't be able to update restaurant address if restaurant not exists", async () => {

    await expect(() => 
      sut.execute({
        restaurant_id: "123129dsi9ds2",
        body: {
          city: "São Paulo",
          state: "SP",
          street: "Rua tal",
          district: "Algum outro bairro aí",
          number: "20"
        }
      })
    ).rejects.toBeInstanceOf(RestaurantNotFoundError);
  });
});
