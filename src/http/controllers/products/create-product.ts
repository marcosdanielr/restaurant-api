import { StatusCodes } from "@/constants/status-codes-enum";
import { RestaurantNotFoundError } from "@/use-cases/errors/restaurant-not-found-error";
import { makeCreateProductUseCase } from "@/use-cases/factories/products/make-create-product-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createProduct(request: FastifyRequest, reply: FastifyReply) {
  const createProductBodySchema = z.object({
    restaurant_id: z.string().uuid(),
    name: z.string(),
    image_path: z.string().optional(),
    price: z.number(),
    category_id: z.string()
  });

  const { 
    restaurant_id,
    name, 
    image_path, 
    price, 
    category_id 
  } = createProductBodySchema.parse(request.body);

  const createProductUseCase = makeCreateProductUseCase();

  try {
    await createProductUseCase.execute({
      restaurant_id,
      body: {
        name,
        image_path: image_path ?? "",
        price,
        category_id
      }
    });

    return reply.status(StatusCodes.CREATED).send();
  } catch (error) {
    if (error instanceof RestaurantNotFoundError) {
      return reply.status(StatusCodes.NOT_FOUND).send({
        message: error.message
      });
    }

    return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }

}
