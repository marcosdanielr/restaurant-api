import { Promotion } from "@/models/promotions-model";

export interface IPromotionsRepository {
  create(body: Promotion): Promise<void>;
}
