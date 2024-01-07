export class MinimumIntervalTimeError extends Error {
  minimum_interval: number;
  constructor(minimum_interval: number) {
    super(`The minimum interval duration should be ${minimum_interval} ${minimum_interval > 1 ? "minutes" : "minute"}`);

    this.minimum_interval = minimum_interval;
  }
}
