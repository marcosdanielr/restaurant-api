import { describe, it, expect, beforeEach } from "vitest";
import { CreateOpeningHoursUseCase } from "./create-opening-hours";
import { InMemoryIOpeningHoursRepository } from "@/repositories/in-memory/in-memory-opening-hours-repository";
import { InMemoryIRestaurantsRepository } from "@/repositories/in-memory/in-memory-restaurants-repository";
import { InvalidWeekdayError } from "../errors/invalid-weekday-error";
import { WeekdayAlreadyExistsError } from "../errors/weekday-already-exists-error";
import { InvalidTimeFormatError } from "../errors/invalid-time-format-error";
import { MinimumIntervalTimeError } from "../errors/minimum-interval-time-error";

let restaurantsRepository: InMemoryIRestaurantsRepository;
let openingHoursRepository: InMemoryIOpeningHoursRepository;
let sut: CreateOpeningHoursUseCase;

describe("Create Opening Hours Use Case", () => {
  beforeEach(() => {
    restaurantsRepository = new InMemoryIRestaurantsRepository();
    openingHoursRepository = new InMemoryIOpeningHoursRepository();
    sut = new CreateOpeningHoursUseCase(openingHoursRepository);
  });

  it("should be able to create opening hour", async () => {

    await restaurantsRepository.create({
      name: "Lanchonete",
      address: "Avenida",
    });

    const { id: restaurant_id } = restaurantsRepository.restaurants[0];

    await sut.execute({
      restaurant_id,
      weekday: "SUNDAY",
      start_time: "08:10",
      end_time: "18:00"
    });

    const openingHours = openingHoursRepository.openingHours;

    expect(openingHours[0]).toEqual(
      expect.objectContaining({
        restaurant_id,
        weekday: "SUNDAY",
        start_time: "08:10",
        end_time: "18:00"
      })
    );
  });

  it("shouldn't able to create opening hours if has invalid weekday", async () => {
    await restaurantsRepository.create({
      name: "Lanchonete",
      address: "Avenida",
    });

    const { id: restaurant_id } = restaurantsRepository.restaurants[0];

    await expect(() => 
      sut.execute({
        restaurant_id,
        weekday: "TEST" as any,
        start_time: "08:10",
        end_time: "18:00"
      })
    ).rejects.toBeInstanceOf(InvalidWeekdayError);
  });


  it("shouldn't able to create opening hours if already exists", async () => {
    await restaurantsRepository.create({
      name: "Lanchonete",
      address: "Avenida",
    });

    const { id: restaurant_id } = restaurantsRepository.restaurants[0];

    await sut.execute({
      restaurant_id,
      weekday: "SUNDAY",
      start_time: "05:10",
      end_time: "16:00"
    });

    await expect(() => 
      sut.execute({
        restaurant_id,
        weekday: "SUNDAY",
        start_time: "08:10",
        end_time: "18:00"
      })
    ).rejects.toBeInstanceOf(WeekdayAlreadyExistsError);
  });


  it("shouldn't able to create opening hours if time format be different than HH:mm", async () => {
    await restaurantsRepository.create({
      name: "Lanchonete",
      address: "Avenida",
    });

    const { id: restaurant_id } = restaurantsRepository.restaurants[0];

    await expect(() => 
      sut.execute({
        restaurant_id,
        weekday: "SUNDAY",
        start_time: "11:10",
        end_time: "18h00"
      })
    ).rejects.toBeInstanceOf(InvalidTimeFormatError);
  });


  it("It shouldn't be possible to create an opening hour if the time interval is not greater than 15 minutes", async () => {
    await restaurantsRepository.create({
      name: "Lanchonete",
      address: "Avenida",
    });

    const { id: restaurant_id } = restaurantsRepository.restaurants[0];

    await expect(() => 
      sut.execute({
        restaurant_id,
        weekday: "SUNDAY",
        start_time: "11:15",
        end_time: "11:29" 
      })
    ).rejects.toBeInstanceOf(MinimumIntervalTimeError);
  });
});
