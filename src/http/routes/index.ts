import { FastifyInstance } from "fastify";

import { restaurantsRoutes } from "./restaurants-routes";
import { productsRoutes } from "./products-routes";
import { categoriesRoutes } from "./categories-routes";
import { restaurantAddressesRoutes } from "./restaurant-addresses-routes";
import { openingHoursRoutes } from "./opening-hours.routes";
import { promotionsRoutes } from "./promotions-routes";

export async function routes(app: FastifyInstance) {
  restaurantsRoutes(app);
  restaurantAddressesRoutes(app);
  openingHoursRoutes(app);
  categoriesRoutes(app);
  productsRoutes(app);
  promotionsRoutes(app);
}
