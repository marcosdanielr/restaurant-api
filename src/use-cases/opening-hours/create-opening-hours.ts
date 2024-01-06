import { OpeningHoursRepository } from "@/repositories/opening-hours-repository";
import { OpeningHours } from "@/types/repositories/opening-hours-repository";
import { InvalidWeekdayError } from "../errors/invalid-weekday-error";
import { WeekdaysEnum } from "@/constants/weekdays-enum";
import { WeekdayAlreadyExistsError } from "../errors/weekday-already-exists-error";

export class CreateOpeningHoursUseCase {
  constructor(private openingHoursRepository: OpeningHoursRepository) {}

  async execute({
    restaurant_id,
    weekday,
    start_hour,
    final_hour,
  }: OpeningHours): Promise<void> {

    const isValidWeekDay = WeekdaysEnum[weekday];

    if (!isValidWeekDay) {
      throw new InvalidWeekdayError();
    }

    const openingHoursExists = await this.openingHoursRepository.getByWeekday(
      restaurant_id,
      weekday
    ); 

    if (openingHoursExists) {
      throw new WeekdayAlreadyExistsError();
    }

    await this.openingHoursRepository.create({
      restaurant_id,
      weekday,
      start_hour,
      final_hour,
    });
  }
}
