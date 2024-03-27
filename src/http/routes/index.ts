import { FastifyInstance } from "fastify";

import { restaurantsRoutes } from "./restaurants-routes";
import { productsRoutes } from "./products-routes";

export async function routes(app: FastifyInstance) {
  restaurantsRoutes(app);
  productsRoutes(app);
}
