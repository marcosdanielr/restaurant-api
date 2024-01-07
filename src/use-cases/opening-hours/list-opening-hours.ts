import { OpeningHours } from "@/models/opening-hours-model";
import { IOpeningHoursRepository } from "@/repositories/opening-hours-repository";

type ListOpeningHoursUseCaseRequest = {
  restaurant_id: string;
}

type ListOpeningHoursUseCaseResponse = {
  openingHours: OpeningHours[]
}

export class ListOpeningHoursUseCase {
  constructor(private openingHoursRepository: IOpeningHoursRepository) {}

  async execute({
    restaurant_id,
  }: ListOpeningHoursUseCaseRequest): Promise<ListOpeningHoursUseCaseResponse> {

    const openingHours = await this.openingHoursRepository.list(restaurant_id);

    return {
      openingHours
    };
  }
}
