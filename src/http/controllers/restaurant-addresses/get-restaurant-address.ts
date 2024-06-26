import { StatusCodes } from "@/constants/status-codes-enum";
import { RestaurantAddressNotFoundError } from "@/use-cases/errors/restaurant-address-not-found-error";
import { RestaurantNotFoundError } from "@/use-cases/errors/restaurant-not-found-error";
import { makeGetRestaurantAddressUseCase } from "@/use-cases/factories/restaurant-addresses/make-get-restaurant-address-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getRestaurantAddress(request: FastifyRequest, reply: FastifyReply) {
  const getRestaurantBodySchema = z.object({
    restaurant_id: z.string().uuid(),
  });

  const { 
    restaurant_id
  } = getRestaurantBodySchema.parse(request.params);

  const getRestaurantAddressUseCase = makeGetRestaurantAddressUseCase();

  try {
    const restaurantAddress = await getRestaurantAddressUseCase.execute({
      restaurant_id
    });

    return reply.status(StatusCodes.OK).send(restaurantAddress);
  } catch (error) {
    if (error instanceof RestaurantNotFoundError || error instanceof RestaurantAddressNotFoundError) {
      return reply.status(StatusCodes.NOT_FOUND).send({
        message: error.message
      });
    }

    return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
}
