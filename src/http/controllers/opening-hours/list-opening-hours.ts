import { StatusCodes } from "@/constants/status-codes-enum";
import { RestaurantNotFoundError } from "@/use-cases/errors/restaurant-not-found-error";
import { makeListOpeningHoursUseCase } from "@/use-cases/factories/opening-hours/make-list-opening-hours-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function listOpeningHours(request: FastifyRequest, reply: FastifyReply) {

  const listOpeningHoursParamsSchema = z.object({
    restaurant_id: z.string().uuid(),
  });

  const { 
    restaurant_id,
  } = listOpeningHoursParamsSchema.parse(request.params);

  const listOpeningHoursUseCase = makeListOpeningHoursUseCase();

  try {
    await listOpeningHoursUseCase.execute({
      restaurant_id,
    });

    return reply.status(StatusCodes.CREATED).send();
  } catch (error) {
    if (error instanceof RestaurantNotFoundError) {
      return reply.status(StatusCodes.NOT_FOUND).send({
        message: error.message
      });
    }
    return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
}
