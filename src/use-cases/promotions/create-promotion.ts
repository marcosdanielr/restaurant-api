import { PromotionsRepository } from "@/repositories/promotions-repository";
import { Promotion } from "@/types/repositories/promotions-repository";

export class CreatePromotionUseCase {
  constructor(private promotionsRepository: PromotionsRepository) {}

  async execute({
    product_id,
    description,
    price, 
    start_datetime,
    final_datetime
  }: Promotion): Promise<void> {

    await this.promotionsRepository.create({
      product_id,
      description,
      price,
      start_datetime,
      final_datetime
    });
  }
}
