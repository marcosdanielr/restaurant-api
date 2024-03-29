import { StatusCodes } from "@/constants/status-codes-enum";
import { makeListRestaurantsUseCase } from "@/use-cases/factories/restaurants/make-list-restaurants-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function listRestaurants(_: FastifyRequest, reply: FastifyReply) {
  const listRestaurantUseCase = makeListRestaurantsUseCase();

  try {
    const restaurants = await listRestaurantUseCase.execute();

    return reply.status(StatusCodes.OK).send(restaurants);
  } catch (error) {
    return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send();  
  }
}
