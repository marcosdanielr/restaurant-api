import { PostgreSQLPromotionsRepository } from "@/repositories/postgresql/postgresql-promotions-repository";
import { CreatePromotionUseCase } from "@/use-cases/promotions/create-promotion";

export function makeCreatePromotionUseCase() {
  const promotionsRepository = new PostgreSQLPromotionsRepository();

  const useCase = new CreatePromotionUseCase(promotionsRepository);

  return useCase;
}
