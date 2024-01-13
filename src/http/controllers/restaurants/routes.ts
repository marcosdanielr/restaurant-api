import { FastifyInstance } from "fastify";

import { createRestaurant } from "./create-restaurant";
import { deleteRestaurantById } from "./delete-restaurant-by-id";
import { getRestaurantById } from "./get-restaurant-by-id";
import { listRestaurants } from "./list-restaurants";

export async function restaurantsRoutes(app: FastifyInstance) {
  app.post("/restaurants", createRestaurant);
  app.delete("/restaurants/:id", deleteRestaurantById);
  app.get("/restaurants/:id", getRestaurantById);
  app.get("/restaurants", listRestaurants);
}