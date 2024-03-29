import { StatusCodes } from "@/constants/status-codes-enum";
import { makeDeleteRestaurantUseCase } from "@/use-cases/factories/restaurants/make-delete-restaurant-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteRestaurantById(request: FastifyRequest, reply: FastifyReply) {

  const deleteRestaurantBodySchema = z.object({
    id: z.string(),
  });

  const { id } = deleteRestaurantBodySchema.parse(request.params);

  const deleteRestaurantUseCase = makeDeleteRestaurantUseCase();

  await deleteRestaurantUseCase.execute({
    id
  });

  return reply.status(StatusCodes.OK).send();
}
