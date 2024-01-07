import { describe, it, expect, beforeEach } from "vitest";
import { ListOpeningHoursUseCase } from "./list-opening-hours";
import { InMemoryIOpeningHoursRepository } from "@/repositories/in-memory/in-memory-opening-hours-repository";
import { InMemoryIRestaurantsRepository } from "@/repositories/in-memory/in-memory-restaurants-repository";

let IRestaurantsRepository: InMemoryIRestaurantsRepository;
let IOpeningHoursRepository: InMemoryIOpeningHoursRepository;
let sut: ListOpeningHoursUseCase;

describe("List Opening Hours Use Case", () => {
  beforeEach(() => {
    IRestaurantsRepository = new InMemoryIRestaurantsRepository();
    IOpeningHoursRepository = new InMemoryIOpeningHoursRepository();
    sut = new ListOpeningHoursUseCase(IOpeningHoursRepository);
  });

  it("should be able to list opening hours", async () => {

    await IRestaurantsRepository.create({
      name: "Lanchonete",
      address: "Avenida",
    });

    const { id: restaurant_id } = IRestaurantsRepository.restaurants[0];

    await IOpeningHoursRepository.create({
      restaurant_id,
      weekday: "FRIDAY",
      start_time: "06:00",
      end_time: "12:00",
    });


    await IOpeningHoursRepository.create({
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
