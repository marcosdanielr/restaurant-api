import { StatusCodes } from "@/constants/status-codes-enum";
import { RestaurantNotFoundError } from "@/use-cases/errors/restaurant-not-found-error";
import { makeGetRestaurantUseCase } from "@/use-cases/factories/restaurants/make-get-restaurant-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getRestaurantById(request: FastifyRequest, reply: FastifyReply) {

  const getRestaurantBodySchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = getRestaurantBodySchema.parse(request.params);

  const getRestaurantUseCase = makeGetRestaurantUseCase();

  try {
    const restaurant = await getRestaurantUseCase.execute({
      id
    });

    return reply.status(StatusCodes.OK).send(restaurant);

  } catch (error) {
    if (error instanceof RestaurantNotFoundError) {
      return reply.status(StatusCodes.NOT_FOUND).send({
        message: error.message
      });
    }

    return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
}
