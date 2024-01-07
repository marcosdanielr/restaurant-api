import { Promotion as PromotionRequest } from "@/models/promotions-model";
import { IPromotionsRepository } from "@/repositories/promotions-repository";
import { PromotionAlreadyExistsError } from "../errors/promotion-already-exists-error";

export class CreatePromotionUseCase {
  constructor(private promotionsRepository: IPromotionsRepository) {}

  async execute({
    product_id,
    description,
    price, 
    weekday,
    start_time,
    end_time
  }: PromotionRequest): Promise<void> {

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
