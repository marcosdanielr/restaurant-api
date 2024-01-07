import { Promotion as PromotionRequest } from "@/models/promotions-model";
import { IPromotionsRepository } from "@/repositories/promotions-repository";

export class CreatePromotionUseCase {
  constructor(private IPromotionsRepository: IPromotionsRepository) {}

  async execute({
    product_id,
    description,
    price, 
    weekday,
    start_time,
    end_time
  }: PromotionRequest): Promise<void> {

    await this.IPromotionsRepository.create({
      product_id,
      description,
      price,
      weekday,
      start_time,
      end_time,
    });
  }
}
