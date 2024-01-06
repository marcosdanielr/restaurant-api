export class MinimumIntervalTimeError extends Error {
  constructor() {
    super("The minimum interval duration should be 15 minutes");
  }
}
