import { FastifyInstance } from "fastify";

import { create } from "./create";
import { deleteById } from "./delete";
import { getById } from "./get";
import { list } from "./list";


export async function restaurantsRoutes(app: FastifyInstance) {
  app.post("/restaurants", create);
  app.delete("/restaurants/:id", deleteById);
  app.get("/restaurants/:id", getById);
  app.get("/restaurants", list);
}
