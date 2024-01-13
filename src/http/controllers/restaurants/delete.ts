import { StatusCodes } from "@/constants/status-codes-enum";
import { makeDeleteRestaurantseCase } from "@/use-cases/factories/restaurants/make-delete-restaurant-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteById(request: FastifyRequest, reply: FastifyReply) {

  const deleteRestaurantBodySchema = z.object({
    id: z.string(),
  });

  const { id } = deleteRestaurantBodySchema.parse(request.params);

  const deleteRestaurantUseCase = makeDeleteRestaurantseCase();

  await deleteRestaurantUseCase.execute({
    id
  });

  return reply.status(StatusCodes.OK).send();
}
