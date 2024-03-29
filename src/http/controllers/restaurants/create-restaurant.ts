import { StatusCodes } from "@/constants/status-codes-enum";
import { makeCreateRestaurantUseCase } from "@/use-cases/factories/restaurants/make-create-restaurant-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createRestaurant(request: FastifyRequest, reply: FastifyReply) {
  const createRestaurantBodySchema = z.object({
    name: z.string(),
    image_path: z.string().optional(),
  });

  const { name, image_path } = createRestaurantBodySchema.parse(request.body);

  const createRestaurantUseCase = makeCreateRestaurantUseCase();

  try {
    await createRestaurantUseCase.execute({
      name,
      image_path: image_path ?? ""
    });

    return reply.status(StatusCodes.CREATED).send();
  } catch (error) {
    return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
}
