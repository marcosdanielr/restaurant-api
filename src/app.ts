import fastify from "fastify";
import fastifyPostgres from "@fastify/postgres";
import { env } from "./env";
import { restaurantsRoutes } from "./http/controllers/restaurants/routes";

export const app = fastify();

app.register(fastifyPostgres, {
  connectionString: env.DATABASE_URL 
});

app.register(restaurantsRoutes);
