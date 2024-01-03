import { CategoryInput } from "@/types/categories/categories-repository";

export interface CategoriesRepository {
  create(restaurant_id: string, body: CategoryInput): Promise<void>;
}
