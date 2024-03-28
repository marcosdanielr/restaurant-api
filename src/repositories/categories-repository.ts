import { Category, CategoryRequest } from "@/models/categories-model";

export interface ICategoriesRepository {
  create(restaurant_id: string, body: CategoryRequest): Promise<void>;
  listCategories(restaurant_id: string): Promise<Category[]>;
}
