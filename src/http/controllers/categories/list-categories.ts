import { StatusCodes } from "@/constants/status-codes-enum";
import { makeListCategoriesUseCase } from "@/use-cases/factories/categories/make-list-categories-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function listCategories(request: FastifyRequest, reply: FastifyReply) {
  const createCategoriesBodySchema = z.object({
    restaurant_id: z.string(),
  });

  const { 
    restaurant_id
  } = createCategoriesBodySchema.parse(request.params);

  const listCategoriesUseCase = makeListCategoriesUseCase();

  const categories = await listCategoriesUseCase.execute({ restaurant_id });

  return reply.status(StatusCodes.OK).send(categories);
}
