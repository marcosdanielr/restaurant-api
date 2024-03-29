import { StatusCodes } from "@/constants/status-codes-enum";
import { RestaurantNotFoundError } from "@/use-cases/errors/restaurant-not-found-error";
import { makeUpdateRestaurantUseCase } from "@/use-cases/factories/restaurants/make-update-restaurant-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function updateRestaurantById(request: FastifyRequest, reply: FastifyReply) {
  const updateRestaurantParamsSchema = z.object({
    id: z.string().uuid(),
  });

  const updateRestaurantBodySchema = z.object({
    name: z.string(),
    image_path: z.string().optional(),
  });

  const { id } = updateRestaurantParamsSchema.parse(request.params);
  const { name, image_path } = updateRestaurantBodySchema.parse(request.body);
  const updateRestaurantUseCase = makeUpdateRestaurantUseCase();

  try {
    await updateRestaurantUseCase.execute({
      id,
      body: {
        name,
        image_path
      } 
    });

    return reply.status(StatusCodes.OK).send();
  } catch (error) {
    if (error instanceof RestaurantNotFoundError) {
      return reply.status(StatusCodes.NOT_FOUND).send({
        message: error.message
      });
    }

    return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
}
