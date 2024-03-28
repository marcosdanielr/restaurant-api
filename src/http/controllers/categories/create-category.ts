import { StatusCodes } from "@/constants/status-codes-enum";
import { makeCreateCategoryUseCase } from "@/use-cases/factories/categories/make-create-category-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createCategory(request: FastifyRequest, reply: FastifyReply) {
  const createCategoryBodySchema = z.object({
    restaurant_id: z.string(),
    name: z.string(),
  });

  const { 
    restaurant_id,
    name, 
  } = createCategoryBodySchema.parse(request.body);

  const createCategoryUseCase = makeCreateCategoryUseCase();

  await createCategoryUseCase.execute({
    restaurant_id,
    body: {
      name
    }
  });

  return reply.status(StatusCodes.CREATED).send();
}
