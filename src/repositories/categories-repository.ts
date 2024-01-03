import { CategoryInput } from "@/types/categories/categories-repository";

export interface CategoriesRepository {
  create(restaurantId: string, body: CategoryInput): Promise<void>;
}
