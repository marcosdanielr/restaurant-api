import { OpeningHoursRepository } from "@/repositories/opening-hours-repository";
import { OpeningHours } from "@/types/repositories/opening-hours-repository";

export class CreateOpeningHoursUseCase {
  constructor(private openingHoursRepository: OpeningHoursRepository) {}

  async execute({
    restaurant_id,
    weekday,
    start_hour,
    final_hour,
  }: OpeningHours): Promise<void> {

    await this.openingHoursRepository.create({
      restaurant_id,
      weekday,
      start_hour,
      final_hour,
    });
  }
}
