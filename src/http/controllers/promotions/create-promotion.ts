import { StatusCodes } from "@/constants/status-codes-enum";
import { InvalidTimeFormatError } from "@/use-cases/errors/invalid-time-format-error";
import { MinimumIntervalTimeError } from "@/use-cases/errors/minimum-interval-time-error";
import { ProductNotFoundError } from "@/use-cases/errors/product-not-found-error";
import { PromotionAlreadyExistsError } from "@/use-cases/errors/promotion-already-exists-error";
import { makeCreatePromotionUseCase } from "@/use-cases/factories/promotions/make-create-promotion-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createPromotion(request: FastifyRequest, reply: FastifyReply) {

  const weekdayTypes = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"] as const;

  const createPromotionBodySchema = z.object({
    product_id: z.string().uuid(),
    price: z.number(),
    weekday: z.enum(weekdayTypes),
    start_time: z.string(),
    end_time: z.string(),
    description: z.string()
  });

  const { 
    product_id,
    price,
    weekday,
    start_time,
    end_time,
    description
  } = createPromotionBodySchema.parse(request.body);

  const createPromotionUseCase = makeCreatePromotionUseCase();

  try {
    await createPromotionUseCase.execute({
      product_id,
      price,
      weekday,
      start_time,
      end_time,
      description
    });

    return reply.status(StatusCodes.CREATED).send();
  } catch (error) {
    if (error instanceof ProductNotFoundError) {
      return reply.status(StatusCodes.NOT_FOUND).send({
        message: error.message
      });
    }

    if (error instanceof InvalidTimeFormatError || error instanceof MinimumIntervalTimeError) {
      return reply.status(StatusCodes.BAD_REQUEST).send({
        message: error.message
      });
    }

    if (error instanceof PromotionAlreadyExistsError) {
      return reply.status(StatusCodes.CONFLICT).send({
        message: error.message
      });
    }

    return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }

}
