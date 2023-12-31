import { IOpeningHoursRepository } from "@/repositories/opening-hours-repository";
import { OpeningHours as OpeningHoursRequest } from "@/models/opening-hours-model";
import { InvalidWeekdayError } from "../errors/invalid-weekday-error";
import { WeekdaysEnum } from "@/constants/weekdays-enum";
import { WeekdayAlreadyExistsError } from "../errors/weekday-already-exists-error";
import { validateTimeFormat } from "@/utils/validate-hour-format";
import { InvalidTimeFormatError } from "../errors/invalid-time-format-error";

import { MinimumIntervalTimeError } from "../errors/minimum-interval-time-error";
import { MINIMUM_INTERVAL_TIME_IN_SECONDS } from "@/constants/minimum-interval-time-in-seconds";
import { isMinimumIntervalInMinutes } from "@/utils/is-minimum-interval-in-minutes";

export class CreateOpeningHoursUseCase {
  constructor(private openingHoursRepository: IOpeningHoursRepository) {}

  async execute({
    restaurant_id,
    weekday,
    start_time,
    end_time,
  }: OpeningHoursRequest): Promise<void> {

    const isNotValidHour = !validateTimeFormat(start_time) || !validateTimeFormat(end_time);
    
    if (isNotValidHour) {
      throw new InvalidTimeFormatError();
    } 
   
    if (!isMinimumIntervalInMinutes(
      start_time, 
      end_time, 
      MINIMUM_INTERVAL_TIME_IN_SECONDS
    )) {
      throw new MinimumIntervalTimeError(MINIMUM_INTERVAL_TIME_IN_SECONDS);
    }

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
      start_time,
      end_time,
    });
  }
}
