import { FastifyInstance } from "fastify";

import { create } from "./create";


export async function restaurantsRoutes(app: FastifyInstance) {
  app.post("/restaurants", create);
}
