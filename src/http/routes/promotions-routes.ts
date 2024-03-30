import { FastifyInstance } from "fastify";
import { createPromotion } from "../controllers/promotions/create-promotion";

export async function promotionsRoutes(app: FastifyInstance) {
  app.post("/promotions", {
    schema: {
      tags: ["Promotions"],
      body: {
        type: "object",
        properties: {
          product_id: { type: "string" },
          description: { type: "string" },
          price: { type: "number" },
          weekday: { type: "string" },
          start_time: { type: "string" },
          end_time: { type: "string" }
        }
      }
    }
  },
  createPromotion);
}
