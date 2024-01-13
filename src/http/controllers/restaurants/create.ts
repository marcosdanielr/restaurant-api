import { StatusCodes } from "@/constants/status-codes-enum";
import { makeCreateRestaurantseCase } from "@/use-cases/factories/make-create-restaurant-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createRestaurantBodySchema = z.object({
    name: z.string(),
    image_path: z.string().optional(),
  });

  const { name, image_path } = createRestaurantBodySchema.parse(request.body);

  const createRestaurantUseCase = makeCreateRestaurantseCase();

  await createRestaurantUseCase.execute({
    name,
    image_path
  });

  return reply.status(StatusCodes.CREATED).send();
}
