import { StatusCodes } from "@/constants/status-codes-enum";
import { RestaurantAddressAlreadyExistsError } from "@/use-cases/errors/restaurant-address-already-exists-error";
import { RestaurantNotFoundError } from "@/use-cases/errors/restaurant-not-found-error";
import { makeCreateRestaurantAddressUseCase } from "@/use-cases/factories/restaurant-addresses/make-create-restaurant-address-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createRestaurantAddress(request: FastifyRequest, reply: FastifyReply) {
  const createRestaurantBodySchema = z.object({
    restaurant_id: z.string().uuid(),
    city: z.string(),
    state: z.string().length(2),
    district: z.string(),
    street: z.string(),
    number: z.string()
  });

  const { 
    restaurant_id,
    city,
    state,
    district,
    street,
    number
  } = createRestaurantBodySchema.parse(request.body);

  const createRestaurantAddressUseCase = makeCreateRestaurantAddressUseCase();

  try {
    await createRestaurantAddressUseCase.execute({
      restaurant_id,
      city,
      state,
      district,
      street,
      number      
    });

    return reply.status(StatusCodes.CREATED).send();
  } catch (error) {
    if (error instanceof RestaurantNotFoundError) {
      return reply.status(StatusCodes.NOT_FOUND).send({
        message: error.message 
      });
    }

    if (error instanceof RestaurantAddressAlreadyExistsError) {
      return reply.status(StatusCodes.NOT_FOUND).send({
        message: error.message
      });
    }

    return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
}
