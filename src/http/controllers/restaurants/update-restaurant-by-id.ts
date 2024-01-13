import { StatusCodes } from "@/constants/status-codes-enum";
import { makeUpdateRestaurantUseCase } from "@/use-cases/factories/restaurants/make-update-restaurant-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function updateRestaurantById(request: FastifyRequest, reply: FastifyReply) {
  const updateRestaurantParamsSchema = z.object({
    id: z.string(),
  });

  const updateRestaurantBodySchema = z.object({
    name: z.string(),
    image_path: z.string().optional(),
  });

  const { id } = updateRestaurantParamsSchema.parse(request.params);
  const { name, image_path } = updateRestaurantBodySchema.parse(request.body);

  const updateRestaurantUseCase = makeUpdateRestaurantUseCase();

  await updateRestaurantUseCase.execute({
    id,
    body: {
      name,
      image_path
    } 
  });

  return reply.status(StatusCodes.OK).send();
}
