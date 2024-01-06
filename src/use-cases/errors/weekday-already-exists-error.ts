export class WeekdayAlreadyExistsError extends Error {
  constructor() {
    super("Weekday already exists!");
  }
}
