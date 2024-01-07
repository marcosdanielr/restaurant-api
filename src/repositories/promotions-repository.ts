import { Promotion } from "@/models/promotions-model";
import { Weekday } from "@/types/weekday";

export interface IPromotionsRepository {
  create(body: Promotion): Promise<void>;
  getByWeekday(product_id: string, weekday: Weekday): Promise<Promotion | null>
}
