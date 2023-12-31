import fastify from "fastify";
import fastifyPostgres from "@fastify/postgres";
import { env } from "./env";

export const app = fastify();

app.register(fastifyPostgres, {
  connectionString: env.DATABASE_URL 
});
