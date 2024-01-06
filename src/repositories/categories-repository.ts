import { CategoryInput } from "@/types/repositories/categories-repository";

export interface CategoriesRepository {
  create(restaurant_id: string, body: CategoryInput): Promise<void>;
}
