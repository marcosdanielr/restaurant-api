import { CategoryRequest } from "@/models/categories-model";

export interface CategoriesRepository {
  create(restaurant_id: string, body: CategoryRequest): Promise<void>;
}