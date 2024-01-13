import { StatusCodes } from "@/constants/status-codes-enum";
import { makeGetRestaurantUseCase } from "@/use-cases/factories/restaurants/make-get-restaurant-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getById(request: FastifyRequest, reply: FastifyReply) {

  const getRestaurantBodySchema = z.object({
    id: z.string(),
  });

  const { id } = getRestaurantBodySchema.parse(request.params);

  const getRestaurantUseCase = makeGetRestaurantUseCase();

  const restaurant = await getRestaurantUseCase.execute({
    id
  });

  return reply.status(StatusCodes.OK).send(restaurant);
}
