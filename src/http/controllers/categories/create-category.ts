import { StatusCodes } from "@/constants/status-codes-enum";
import { RestaurantNotFoundError } from "@/use-cases/errors/restaurant-not-found-error";
import { makeCreateCategoryUseCase } from "@/use-cases/factories/categories/make-create-category-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createCategory(request: FastifyRequest, reply: FastifyReply) {
  const createCategoryBodySchema = z.object({
    restaurant_id: z.string().uuid(),
    name: z.string(),
  });

  const { 
    restaurant_id,
    name, 
  } = createCategoryBodySchema.parse(request.body);

  const createCategoryUseCase = makeCreateCategoryUseCase();

  try {
    await createCategoryUseCase.execute({
      restaurant_id,
      body: {
        name
      }
    });

    return reply.status(StatusCodes.CREATED).send();
  } catch (error) {
    if (error instanceof RestaurantNotFoundError) {
      return reply.status(StatusCodes.NOT_FOUND).send({
        message: error.message
      });
    }

    return reply.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
