import { CategoryInput } from "@/types/categories/categories-repository";

export interface CategoryRepository {
  create(restaurantId: string, body: CategoryInput): Promise<void>;
}
