import { FastifyInstance } from "fastify";
import { createProduct } from "../controllers/products/create-product";
import { listRestaurantProducts } from "../controllers/products/list-restaurant-products";

export async function productsRoutes(app: FastifyInstance) {

  app.post("/products", {
    schema: {
      tags: ["Products"],
      body: {
        type: "object",
        properties: {
          restaurant_id: { type: "string" },
          name: { type: "string" },
          image_path: { type: "string" },
          price: { type: "number" },
          category_id: { type: "string" },
        }
      }
    }
  }, createProduct);


  app.get("/products/:restaurant_id", {
    schema: {
      tags: ["Products"],
    }
  }, listRestaurantProducts);
}
