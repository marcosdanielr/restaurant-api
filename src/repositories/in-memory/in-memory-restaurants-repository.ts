import { UpdateProductRequest } from "@/models/products-model";
import { CreateRestaurantRequest, Restaurant } from "@/models/restaurants-model";
import { RestaurantsRepository } from "@/repositories/restaurants-repository";
import { randomUUID } from "node:crypto";

export class InMemoryRestaurantsRepository  implements RestaurantsRepository {
  public restaurants: Restaurant[] = []; 

  async create(body: CreateRestaurantRequest) {

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

  async list() {
    return this.restaurants;
  }

  async getById(id: string) {
    const restaurant = this.restaurants.find(restaurant => restaurant.id === id) ?? null;

    return restaurant;
  }

  async deleteById(id: string) {
    const index = this.restaurants.findIndex(restaurant => restaurant.id === id);

    if (index >= 0) {
      this.restaurants.splice(index, 1);
    }
  }

  async update(id: string, body: UpdateProductRequest) {
    const index = this.restaurants.findIndex(restaurant => restaurant.id === id);

    if (index >= 0) {
      this.restaurants[index] = {
        ...this.restaurants[index],
        ...body,
        created_at: this.restaurants[index].created_at,
        updated_at: new Date(),
      };
    }
  }
}
