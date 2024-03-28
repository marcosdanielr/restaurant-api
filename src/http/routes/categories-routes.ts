import { FastifyInstance } from "fastify";
import { createCategory } from "../controllers/categories/create-category";

export async function categoriesRoutes(app: FastifyInstance) {

  app.post("/categories", {
    schema: {
      tags: ["Categories"],
      body: {
        type: "object",
        properties: {
          restaurant_id: { type: "string" },
          name: { type: "string" },
        }
      }
    }
  },
  createCategory
  );
}
