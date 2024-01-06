export class InvalidTimeFormatError extends Error {
  constructor() {
    super("Time should be hh:MM format!");
  }
}
