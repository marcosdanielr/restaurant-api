import { StatusCodes } from "@/constants/status-codes-enum";
import { InvalidTimeFormatError } from "@/use-cases/errors/invalid-time-format-error";
import { MinimumIntervalTimeError } from "@/use-cases/errors/minimum-interval-time-error";
import { RestaurantNotFoundError } from "@/use-cases/errors/restaurant-not-found-error";
import { WeekdayAlreadyExistsError } from "@/use-cases/errors/weekday-already-exists-error";
import { makeCreateOpeningHourUseCase } from "@/use-cases/factories/opening-hours/make-create-opening-hour-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createOpeningHour(request: FastifyRequest, reply: FastifyReply) {

  const weekdayTypes = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"] as const;

  const createOpeningHourBodySchema = z.object({
    restaurant_id: z.string().uuid(),
    weekday: z.enum(weekdayTypes),
    start_time: z.string(),
    end_time: z.string()
  });

  const { 
    restaurant_id,
    start_time,
    end_time,
    weekday
  } = createOpeningHourBodySchema.parse(request.body);

  const createOpeningHourUseCase = makeCreateOpeningHourUseCase();

  try {
    await createOpeningHourUseCase.execute({
      restaurant_id,
      weekday,
      start_time,
      end_time
    });

    return reply.status(StatusCodes.CREATED).send();
  } catch (error) {
    if (error instanceof RestaurantNotFoundError) {
      return reply.status(StatusCodes.NOT_FOUND).send({
        message: error.message
      });
    }

    if (error instanceof InvalidTimeFormatError || error instanceof MinimumIntervalTimeError || error instanceof WeekdayAlreadyExistsError) {
      return reply.status(StatusCodes.BAD_REQUEST).send({
        message: error.message
      });
    }
    return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
}
