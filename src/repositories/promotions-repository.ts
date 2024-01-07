import { Promotion } from "@/models/promotions-model";

export interface PromotionsRepository {
  create(body: Promotion): Promise<void>;
}
