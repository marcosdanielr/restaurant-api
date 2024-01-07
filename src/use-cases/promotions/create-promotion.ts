import { Promotion as PromotionRequest } from "@/models/promotions-model";
import { PromotionsRepository } from "@/repositories/promotions-repository";

export class CreatePromotionUseCase {
  constructor(private promotionsRepository: PromotionsRepository) {}

  async execute({
    product_id,
    description,
    price, 
    weekday,
    start_time,
    end_time
  }: PromotionRequest): Promise<void> {

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
