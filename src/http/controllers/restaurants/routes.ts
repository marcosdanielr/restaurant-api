import { FastifyInstance } from "fastify";

import { create } from "./create";
import { deleteById } from "./delete";


export async function restaurantsRoutes(app: FastifyInstance) {
  app.post("/restaurants", create);
  app.delete("/restaurants/:id", deleteById);
}
