import { CreatePromotionRequest } from "@/models/promotions-model";
import { IPromotionsRepository } from "@/repositories/promotions-repository";
import { PromotionAlreadyExistsError } from "../errors/promotion-already-exists-error";
import { isMinimumIntervalInMinutes } from "@/utils/is-minimum-interval-in-minutes";
import { MINIMUM_INTERVAL_TIME_IN_SECONDS } from "@/constants/minimum-interval-time-in-seconds";
import { MinimumIntervalTimeError } from "../errors/minimum-interval-time-error";
import { validateTimeFormat } from "@/utils/validate-hour-format";
import { InvalidTimeFormatError } from "../errors/invalid-time-format-error";
import { WeekdaysEnum } from "@/constants/weekdays-enum";
import { InvalidWeekdayError } from "../errors/invalid-weekday-error";

export class CreatePromotionUseCase {
  constructor(private promotionsRepository: IPromotionsRepository) {}

  async execute({
    product_id,
    description,
    price, 
    weekday,
    start_time,
    end_time
  }: CreatePromotionRequest): Promise<void> {

    const isValidWeekDay = WeekdaysEnum[weekday];

    if (!isValidWeekDay) {
      throw new InvalidWeekdayError();
    }

    const isNotValidHour = !validateTimeFormat(start_time) || !validateTimeFormat(end_time);
    
    if (isNotValidHour) {
      throw new InvalidTimeFormatError();
    } 

    const promotionExists = await this.promotionsRepository.getByWeekday(product_id, weekday);

    if (promotionExists) {
      throw new PromotionAlreadyExistsError();
    }

    if (!isMinimumIntervalInMinutes(
      start_time, 
      end_time, 
      MINIMUM_INTERVAL_TIME_IN_SECONDS
    )) {
      throw new MinimumIntervalTimeError(MINIMUM_INTERVAL_TIME_IN_SECONDS);
    }

    await this.promotionsRepository.create({
      product_id,
      description,
      price,
      weekday,
      start_time,
      end_time,
    });
  }
}
