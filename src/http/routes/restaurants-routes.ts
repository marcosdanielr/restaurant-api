import { FastifyInstance } from "fastify";

import { createRestaurant } from "../controllers/restaurants/create-restaurant";
import { deleteRestaurantById } from "../controllers/restaurants/delete-restaurant-by-id";
import { getRestaurantById } from "../controllers/restaurants/get-restaurant-by-id";
import { listRestaurants } from "../controllers/restaurants/list-restaurants";
import { updateRestaurantById } from "../controllers/restaurants/update-restaurant-by-id";

export async function restaurantsRoutes(app: FastifyInstance) {
  app.post("/restaurants",   {
    schema: {
      tags: ["Restaurants"],
      body: {
        type: "object",
        properties: {
          name: { type: "string" },
          image_path: { type: "string" },
        }
      }
    }
  },
  createRestaurant);

  app.delete("/restaurants/:id", {
    schema: {
      tags: ["Restaurants"],
    }
  }, deleteRestaurantById);

  app.get("/restaurants/:id", {
    schema: {
      tags: ["Restaurants"],
    }
  }, getRestaurantById);

  app.get("/restaurants", {
    schema: {
      tags: ["Restaurants"],
    }
  }, listRestaurants);

  app.put("/restaurants/:id", {
    schema: {
      tags: ["Restaurants"],
      body: {
        type: "object",
        properties: {
          name: { type: "string" },
          image_path: { type: "string" },
        }
      }
    }
  }, updateRestaurantById);
}
