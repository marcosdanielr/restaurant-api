import { Category, CategoryRequest } from "@/models/categories-model";
import { ICategoriesRepository } from "../categories-repository";
import { randomUUID } from "crypto";

export class InMemoryCategoriesRepository  implements ICategoriesRepository {
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

  async list(restaurant_id: string) {
    const categories = this.categories.filter(category => category.restaurant_id === restaurant_id);

    return categories;          
  }
}
