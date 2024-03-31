import { PostgreSQLProductsRepository } from "@/repositories/postgresql/postgresql-products-repository";
import { PostgreSQLPromotionsRepository } from "@/repositories/postgresql/postgresql-promotions-repository";
import { CreatePromotionUseCase } from "@/use-cases/promotions/create-promotion";

export function makeCreatePromotionUseCase() {
  const promotionsRepository = new PostgreSQLPromotionsRepository();
  const productsRepository = new PostgreSQLProductsRepository();

  const useCase = new CreatePromotionUseCase(promotionsRepository, productsRepository);

  return useCase;
}
