import { CategoriesRepository } from "../categories-repository";
import { Category, CategoryInput } from "@/types/categories/categories-repository";
import { randomUUID } from "crypto";

export class InMemoryCategoriesRepository  implements CategoriesRepository {
  public categories: Category[] = []; 

  async create(restaurant_id: string, body: CategoryInput): Promise<void> {
   
    const category = {
      id: randomUUID(),
      restaurant_id,
      name: body.name,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.categories.push(category);
  }
}
