export type OpeningHours = {
  restaurant_id: string;
  weekday: "sunday" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday";
  start_hour: Date;
  final_hour: Date;
}
