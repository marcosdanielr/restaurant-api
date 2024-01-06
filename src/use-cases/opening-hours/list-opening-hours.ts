import { OpeningHoursRepository } from "@/repositories/opening-hours-repository";
import { OpeningHours } from "@/types/repositories/opening-hours-repository";

type ListOpeningHoursUseCaseRequest = {
  restaurant_id: string;
}

type ListOpeningHoursUseCaseResponse = {
  openingHours: OpeningHours[]
}

export class ListOpeningHoursUseCase {
  constructor(private openingHoursRepository: OpeningHoursRepository) {}

  async execute({
    restaurant_id,
  }: ListOpeningHoursUseCaseRequest): Promise<ListOpeningHoursUseCaseResponse> {

    const openingHours = await this.openingHoursRepository.list(restaurant_id);

    return {
      openingHours
    };
  }
}
