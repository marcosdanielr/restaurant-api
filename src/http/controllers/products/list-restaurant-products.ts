import { StatusCodes } from "@/constants/status-codes-enum";
import { RestaurantNotFoundError } from "@/use-cases/errors/restaurant-not-found-error";
import { makeListRestaurantProductsUseCase } from "@/use-cases/factories/products/make-list-restaurant-products-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function listRestaurantProducts(request: FastifyRequest, reply: FastifyReply) {
  const listRestaurantProductsParamsSchema = z.object({
    restaurant_id: z.string().uuid(),
  });

  const { restaurant_id } = listRestaurantProductsParamsSchema.parse(request.params);

  const listRestaurantProductsUseCase = makeListRestaurantProductsUseCase();

  try {
    const products = await listRestaurantProductsUseCase.execute({
      restaurant_id
    });

    return reply.status(StatusCodes.OK).send(products);
  } catch (error) {
    if (error instanceof RestaurantNotFoundError) {
      return reply.status(StatusCodes.NOT_FOUND).send({
        message: error.message
      });
    }

    return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
}
