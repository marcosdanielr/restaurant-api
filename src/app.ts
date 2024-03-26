import fastify from "fastify";
import fastifyPostgres from "@fastify/postgres";
import { env } from "./env";
import { StatusCodes } from "./constants/status-codes-enum";
import { ZodError } from "zod";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

import { restaurantsRoutes } from "./http/routes/restaurants-routes";
import fastifyCors from "@fastify/cors";

export const app = fastify();

app.register(fastifyCors, {
  origin: "*",
});


app.register(fastifySwagger, {
  prefix: "/docs",
});

app.register(fastifySwaggerUi, {
  prefix: "/docs",
});


app.register(fastifyPostgres, {
  connectionString: env.DATABASE_URL 
});

app.register(restaurantsRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(StatusCodes.BAD_REQUEST)
      .send({message: "Validation error.", issues: error.format()});
  }

  console.error(error);

  return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message: "Internal server error."});
});
