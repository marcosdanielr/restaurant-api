import { StatusCodes } from "@/constants/status-codes-enum";
import { RestaurantAddressAlreadyExistsError } from "@/use-cases/errors/restaurant-address-already-exists-error";
import { RestaurantAddressNotFoundError } from "@/use-cases/errors/restaurant-address-not-found-error";
import { RestaurantNotFoundError } from "@/use-cases/errors/restaurant-not-found-error";
import { makeUpdateRestaurantAddressUseCase } from "@/use-cases/factories/restaurant-addresses/make-update-restaurant-address-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function updateRestaurantAddress(request: FastifyRequest, reply: FastifyReply) {
  const updateRestaurantBodySchema = z.object({
    city: z.string().optional(),
    state: z.string().length(2).optional(),
    district: z.string().optional(),
    street: z.string().optional(),
    number: z.string().optional()
  });

  const updateRestaurantParamsSchema = z.object({
    restaurant_id: z.string().uuid()
  });

  const { 
    city,
    state,
    district,
    street,
    number
  } = updateRestaurantBodySchema.parse(request.body);


  const { restaurant_id } = updateRestaurantParamsSchema.parse(request.params);

  const updateRestaurantAddressUseCase = makeUpdateRestaurantAddressUseCase();

  try {
    await updateRestaurantAddressUseCase.execute({
      restaurant_id,
      body: {
        city,
        state,
        district,
        street,
        number
      }
    });

    return reply.status(StatusCodes.OK).send();
  } catch (error) {
    if (error instanceof RestaurantNotFoundError || error instanceof RestaurantAddressNotFoundError) {
      return reply.status(StatusCodes.NOT_FOUND).send({
        message: error.message 
      });
    }

    return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
}
