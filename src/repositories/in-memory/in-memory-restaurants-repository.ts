import { RestaurantsRepository } from "@/repositories/restaurants-repository";
import { CreateRestaurantInput, Restaurant } from "@/types/repositories/restaurants-repository";
import { randomUUID } from "node:crypto";

export class InMemoryRestaurantsRepository  implements RestaurantsRepository {
  public restaurants: Restaurant[] = []; 

  async create(body: CreateRestaurantInput) {

    const restaurant = {
      id: randomUUID(),
      name: body.name,
      address: body.address,
      image_path: body.image_path,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.restaurants.push(restaurant);
  }
}
