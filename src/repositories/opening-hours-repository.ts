import { OpeningHours } from "@/types/repositories/opening-hours-repository";

export interface OpeningHoursRepository {
  create(body: OpeningHours): Promise<void>;
}
