import { FastifyInstance } from "fastify";

import { restaurantsRoutes } from "./restaurants-routes";
import { productsRoutes } from "./products-routes";
import { categoriesRoutes } from "./categories-routes";

export async function routes(app: FastifyInstance) {
  restaurantsRoutes(app);
  productsRoutes(app);
  categoriesRoutes(app);
}