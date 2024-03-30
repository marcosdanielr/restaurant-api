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
import { IProductsRepository } from "@/repositories/products-repository";
import { ProductNotFoundError } from "../errors/product-not-found-error";

export class CreatePromotionUseCase {
  constructor(
    private promotionsRepository: IPromotionsRepository,
    private productsRepository: IProductsRepository
  ) {}

  async execute({
    product_id,
    description,
    price, 
    weekday,
    start_time,
    end_time
  }: CreatePromotionRequest): Promise<void> {

    const isValidWeekDay = weekday.toUpperCase() in WeekdaysEnum;

    if (!isValidWeekDay) {
      throw new InvalidWeekdayError();
    }

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

    const productExists = await this.productsRepository.getById(product_id);

    if (!productExists) {
      throw new ProductNotFoundError();
    }

    const promotionExists = await this.promotionsRepository.getByWeekday(product_id, weekday);

    if (promotionExists) {
      throw new PromotionAlreadyExistsError();
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
