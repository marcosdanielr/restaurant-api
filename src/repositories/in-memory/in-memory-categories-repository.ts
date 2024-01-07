import { Category, CategoryRequest } from "@/models/categories-model";
import { ICategoriesRepository } from "../categories-repository";
import { randomUUID } from "crypto";

export class InMemoryICategoriesRepository  implements ICategoriesRepository {
  public categories: Category[] = []; 

  async create(restaurant_id: string, body: CategoryRequest) {
   
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
