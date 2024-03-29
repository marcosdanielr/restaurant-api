import { FastifyInstance } from "fastify";
import { createRestaurantAddress } from "../controllers/restaurant-addresses/create-restaurant-address";

export async function restaurantAddressesRoutes(app: FastifyInstance) {
  app.post("/restaurant-addresses",   {
    schema: {
      tags: ["Restaurant Addresses"],
      body: {
        type: "object",
        properties: {
          restaurant_id: { type: "string" },
          city: { type: "string" },
          state: { type: "string" },
          district: { type: "string" },
          street: { type: "string" },
          number: { type: "string" }
        }
      }
    }
  },
  createRestaurantAddress);
}
