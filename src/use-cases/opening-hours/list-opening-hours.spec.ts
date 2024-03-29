import { describe, it, expect, beforeEach } from "vitest";
import { ListOpeningHoursUseCase } from "./list-opening-hours";
import { InMemoryOpeningHoursRepository } from "@/repositories/in-memory/in-memory-opening-hours-repository";
import { InMemoryRestaurantsRepository } from "@/repositories/in-memory/in-memory-restaurants-repository";
import { RestaurantNotFoundError } from "../errors/restaurant-not-found-error";

let restaurantsRepository: InMemoryRestaurantsRepository;
let openingHoursRepository: InMemoryOpeningHoursRepository;
let sut: ListOpeningHoursUseCase;

describe("List Opening Hours Use Case", () => {
  beforeEach(() => {
    restaurantsRepository = new InMemoryRestaurantsRepository();
    openingHoursRepository = new InMemoryOpeningHoursRepository();
    sut = new ListOpeningHoursUseCase(openingHoursRepository, restaurantsRepository);
  });

  it("should be able to list opening hours", async () => {

    await restaurantsRepository.create({
      name: "Lanchonete",
    });

    const { id: restaurant_id } = restaurantsRepository.restaurants[0];

    await openingHoursRepository.create({
      restaurant_id,
      weekday: "friday",
      start_time: "06:00",
      end_time: "12:00",
    });


    await openingHoursRepository.create({
      restaurant_id,
      weekday: "monday",
      start_time: "06:00",
      end_time: "12:00",
    });

    const { openingHours } = await sut.execute({
      restaurant_id,
    });

    expect(openingHours).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          restaurant_id,
          weekday: "friday",
        }),
        expect.objectContaining({
          restaurant_id,
          weekday: "monday",
        })
      ])
    );

    expect(openingHours.length).toEqual(2);
  });

  it("shouldn't be able to list opening hours if restaurant not exists", async () => {
    await expect(() => sut.execute({
      restaurant_id: "sddsaji2o2ds",
    })).rejects.toBeInstanceOf(RestaurantNotFoundError);
  });
});
