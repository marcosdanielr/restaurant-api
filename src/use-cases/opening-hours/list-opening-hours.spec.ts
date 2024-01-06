import { describe, it, expect, beforeEach } from "vitest";
import { ListOpeningHoursUseCase } from "./list-opening-hours";
import { InMemoryOpeningHoursRepository } from "@/repositories/in-memory/in-memory-opening-hours-repository";
import { InMemoryRestaurantsRepository } from "@/repositories/in-memory/in-memory-restaurants-repository";

let restaurantsRepository: InMemoryRestaurantsRepository;
let openingHoursRepository: InMemoryOpeningHoursRepository;
let sut: ListOpeningHoursUseCase;

describe("List Opening Hours Use Case", () => {
  beforeEach(() => {
    restaurantsRepository = new InMemoryRestaurantsRepository();
    openingHoursRepository = new InMemoryOpeningHoursRepository();
    sut = new ListOpeningHoursUseCase(openingHoursRepository);
  });

  it("should be able to list opening hours", async () => {

    await restaurantsRepository.create({
      name: "Lanchonete",
      address: "Avenida",
    });

    const { id: restaurant_id } = restaurantsRepository.restaurants[0];

    await openingHoursRepository.create({
      restaurant_id,
      weekday: "FRIDAY",
      start_time: "06:00",
      end_time: "12:00",
    });


    await openingHoursRepository.create({
      restaurant_id,
      weekday: "MONDAY",
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
          weekday: "FRIDAY",
        }),
        expect.objectContaining({
          restaurant_id,
          weekday: "MONDAY",
        })
      ])
    );

    expect(openingHours.length).toEqual(2);
  });
});
