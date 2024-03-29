import { StatusCodes } from "@/constants/status-codes-enum";
import { RestaurantNotFoundError } from "@/use-cases/errors/restaurant-not-found-error";
import { makeListCategoriesUseCase } from "@/use-cases/factories/categories/make-list-categories-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function listCategories(request: FastifyRequest, reply: FastifyReply) {
  const createCategoriesBodySchema = z.object({
    restaurant_id: z.string().uuid(),
  });

  const { 
    restaurant_id
  } = createCategoriesBodySchema.parse(request.params);

  const listCategoriesUseCase = makeListCategoriesUseCase();

  try {

    const categories = await listCategoriesUseCase.execute({ restaurant_id });
    return reply.status(StatusCodes.OK).send(categories);

  } catch (error) {
    if (error instanceof RestaurantNotFoundError) {
      return reply.status(StatusCodes.NOT_FOUND).send({
        message: error.message
      });
    }

    return reply.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
