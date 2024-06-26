import { Category, CategoryRequest } from "@/models/categories-model";

export interface ICategoriesRepository {
  create(restaurant_id: string, body: CategoryRequest): Promise<void>;
  getById(id: string): Promise<Category | null>;
  list(restaurant_id: string): Promise<Category[]>;
}
