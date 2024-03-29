import { StatusCodes } from "@/constants/status-codes-enum";
import { RestaurantNotFoundError } from "@/use-cases/errors/restaurant-not-found-error";
import { makeDeleteRestaurantUseCase } from "@/use-cases/factories/restaurants/make-delete-restaurant-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteRestaurantById(request: FastifyRequest, reply: FastifyReply) {

  const deleteRestaurantBodySchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = deleteRestaurantBodySchema.parse(request.params);

  const deleteRestaurantUseCase = makeDeleteRestaurantUseCase();

  try {
    await deleteRestaurantUseCase.execute({
      id
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
