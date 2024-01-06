import { Promotion } from "@/types/repositories/promotions-repository";

export interface PromotionsRepository {
  create(body: Promotion): Promise<void>;
}
