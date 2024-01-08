import { Promotion } from "@/models/promotions-model";
import { IPromotionsRepository } from "../promotions-repository";
import { Weekday } from "@/types/weekday";

export class InMemoryPromotionsRepository implements IPromotionsRepository {
  public promotions: Promotion[] = [];

  async create(body: Promotion) {
    const { product_id, price, description, weekday, start_time, end_time } = body;

    const promotion = {
      product_id,
      price,
      description,
      weekday,
      start_time,
      end_time
    };

    this.promotions.push(promotion);
  }

  async getByWeekday(product_id: string, weekday: Weekday) {
    const promotion = this.promotions.find(promotion => promotion.product_id === product_id && promotion.weekday === weekday) ?? null;

    return promotion; 
  }
}
